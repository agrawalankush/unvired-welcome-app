const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const Audit = mongoose.model('Audit');
const passport = require('passport');
const utils = require('../lib/utils');

router.get('/welcome', (req, res, next) => {
  res.status(200).json({ success: true, msg: "Welcome in the express App!!" });
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!" });
});

// Validate an existing user and issue a JWT
router.post('/login', function (req, res, next) {
    // console.log(req);
    User.findOne({ email: req.body.email })
        .then((user) => {

            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }

            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

            if (isValid) {
              const newLogin = new Audit({
                user: user.email,
                loginTime: Date.now(),
                logoutTime: Date.now(),
                ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress
            });
                  try {
                    newLogin.save()
                        .then((audit) => {
                            const tokenObject = utils.issueJWT(user);
                            res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });
                        });
                } catch (err) {
                    res.json({ success: false, msg: err });
                }


            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
});

// Register a new user
router.post('/register', function (req, res, next) {
  // console.log(req.body, typeof req.body.password);
    User.findOne({ email: req.body.email })
        .then((user) => {

            if (user) {
                res.status(401).json({ success: false, msg: "User Already Exists, Try Login!!" });
            }
            else {

                const saltHash = utils.genPassword(req.body.password);

                const salt = saltHash.salt;
                const hash = saltHash.hash;

                const newUser = new User({
                    email: req.body.email,
                    hash: hash,
                    salt: salt,
                    role: req.body.role,
                });

                try {

                    newUser.save()
                        .then((user) => {
                            res.json({ success: true, user: user });
                        });

                } catch (err) {

                    res.json({ success: false, msg: err });

                }

            }

        })
        .catch((err) => {
            next(err);
        });

});
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  let pageoffset = parseInt(req.query.pageIndex, 10) || 0;
  let pagesize = parseInt(req.query.pageSize,10) || 5;
  var query = {};
  User.find(query)
    .select('_id role email createdDate')
    .sort({ createdDate: -1 })
    .skip(pageoffset)
    .limit(pagesize)
    .then(users =>
      User.countDocuments(query)
    .exec((count_error, count) => {
      if (count_error) {
        return res.json(count_error);
      }
      return res.json({
        total: count,
        users: users
      });
    }))
    .catch(err => next(err));
});
module.exports = router;
