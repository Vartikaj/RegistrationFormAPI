const dependencies = require('../dependencies');
const router = dependencies.router;
const {
    //HERE WE PASS THE FUNCTION NAME
    postRegistrationData,
    postLoginData,
} = require('../controllers/registration-controller');

router.route('/postRegistrationData').post(postRegistrationData);
router.route('/postLoginData').post(postLoginData);

module.exports = router;