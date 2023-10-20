const dependencies = require('../dependencies')

const router = dependencies.router;

// router.use('/school-management', require('./registration-route'));
router.use('/countryCode', require('./country-route'))

module.exports = router;