const dependencies = require("../dependencies")
const router = dependencies.router;
const {
    postLoginData,
} = require('../controllers/Login-controller');
const ApiRateLimiter = require("../middleware/apiRateLimiter.middleware");

router.route('/postLoginData').post(ApiRateLimiter, postLoginData);

module.exports = router;