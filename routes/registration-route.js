const dependencies = require('../dependencies');
const router = dependencies.router;
const {
    //HERE WE PASS THE FUNCTION NAME
    getRegistrationData

} = require('../controllers/registration-controller');

router.route('/getRegistrationData').get(getRegistrationData);


module.exports = router;