const router = require('express').Router();

router.use('/api/users', require('./users'));
router.use('/api/audits', require('./audit'));

module.exports = router;
