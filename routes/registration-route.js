const dependencies = require('../dependencies');
const router = dependencies.router;
const {
    //HERE WE PASS THE FUNCTION NAME
    postRegistrationData,
    postUsername,

} = require('../controllers/registration-controller');

router.route('/postRegistrationData').post(postRegistrationData);
router.route('/postUsername').post(postUsername);


module.exports = router;