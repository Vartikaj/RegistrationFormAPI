const dependencies = require('../dependencies')

const router = dependencies.router;

router.use('/registrationForm', require('./registration-route'));
router.use('/login', require('./Login-route'));
router.use('/countryCode', require('./country-route'));
router.use('/dashboard', require('./dashboard-route'));

module.exports = router;