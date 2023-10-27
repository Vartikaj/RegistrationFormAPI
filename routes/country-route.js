const dependencies = require('../dependencies');

const router = dependencies.router;

const {
    getInsertData,
    getListOfData
} = require('../controllers/countryController/index');

router.route('/getInsertData').get(getInsertData);
router.route('/getListOfData').get(getListOfData);

module.exports = router;