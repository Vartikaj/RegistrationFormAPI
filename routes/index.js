const dependencies = require('../dependencies')

const router = dependencies.router;

router.use('/registrationForm', require('./registration-route'));
router.use('/countryCode', require('./country-route'))

module.exports = router;