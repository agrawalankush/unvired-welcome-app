const mongoose = require('mongoose');
const router = require('express').Router();
const Audit = mongoose.model('Audit');
const passport = require('passport');


router.get('/all', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Audit.find().select()
    .then(users => res.json(users))
    .catch(err => next(err));
});
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  Audit.findById(req.params.id).select()
  .then(user => user ? res.json(user) : res.sendStatus(404))
  .catch(err => next(err));
});
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  Audit.findById(req.params.id).select()
  .then(audit => {
    Object.assign(audit, req.body);
    try {
      audit.save()
          .then((user) => {
              res.json({ success: true, user: user });
          });
  } catch (err) {
      res.json({ success: false, msg: err });
  }
  }
    )
  .catch(err => next(err));
});
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  Audit.findByIdAndRemove(req.params.id)
  .then(audit => {
    res.json({ success: true, msg: `Deleted Audit of ${audit.user} successfully!!` });
  })
  .catch(err => next(err));
});
module.exports = router;
