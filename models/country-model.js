const dependencies = require('../dependencies');
const uniqueValidator = dependencies.uniqueValidator;
const mongoose = dependencies.mongoose;

const Schema = mongoose.Schema;
const countryModel = new Schema({
    code : {
        type: String,
        maxLength: [10, 'country Code must be 10 character long'],
        trim: true,
        unique: true,
        require: true,
    },
    name: {
        type: String,
        maxLength: [100, 'Country name must be 20 characters long'],
        trim: true,
        require: true
    }
});

countryModel.plugin(uniqueValidator, { message: '{PATH} : {VALUE} is already exists!!!' });

const countryModelData = mongoose.model('country', countryModel);

module.exports = countryModelData;
