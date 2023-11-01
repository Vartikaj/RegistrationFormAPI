const dependencies = require("../dependencies");
const router = dependencies.router;
const {
    findDataFromDatabase
} = require('../controllers/dashboard-controller');

router.route('/findDataFromDatabase').post(findDataFromDatabase);

module.exports = router;