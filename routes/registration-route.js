const dependencies = require('../dependencies');
const router = dependencies.router;
const {
    //HERE WE PASS THE FUNCTION NAME
    postRegistrationData,
} = require('../controllers/registration-controller');

router.route('/postRegistrationData').post(postRegistrationData);

module.exports = router;