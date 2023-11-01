const dependencies = require("../dependencies")
const router = dependencies.router;
const {
    postLoginData,
} = require('../controllers/Login-controller');

router.route('/postLoginData').post(postLoginData);

module.exports = router;