const dependencies = require("../dependencies");
const router = dependencies.router;
const isAuthenticate = dependencies.isAuthenticat;
const {
    findDataFromDatabase
} = require('../controllers/dashboard-controller');

const verifyToken = require('../middleware/verifyToken.middleware');
router.route('/findDataFromDatabase').get(verifyToken,findDataFromDatabase);

module.exports = router;