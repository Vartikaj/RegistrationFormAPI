const dependencies = require('../dependencies');

const router = dependencies.router;

const {
    getInsertData
} = require('../controllers/countryController/index');

router.route('/getInsertData').get(getInsertData);

module.exports = router;