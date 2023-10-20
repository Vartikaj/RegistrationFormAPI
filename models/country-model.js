const dependencies = require('../dependencies');
const uniqueValidator = dependencies.uniqueValidator;

const mongoose = dependencies.mongoose;
const Schema = mongoose.Schema;

const stateModel = new Schema({
    countryCode : {
        type: String,
        maxLength: [10, 'country Code must be 10 character long'],
        trim: true,
        unique: true,
        require: true,
    },
    name: {
        type: String,
        maxLength: [20, 'Country name must be 20 characters long'],
        trim: true,
        require: true
    }
});

stateModel.plugin(uniqueValidator, { message: '{PATH} : {VALUE} is already exists!!!' });
