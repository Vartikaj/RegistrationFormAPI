const dependencies = require('../dependencies');
const mongoose = dependencies.mongoose;
const validatorPackage = dependencies.validatorPackage;

//THIS PAKAGE IN INSTALL BECAUSE WE WANT TO GET THE UNIQUE VALUE, WHEN USER TRY TO INPUT DATA
const uniqueValidator = dependencies.uniqueValidator;
const bcrypt = dependencies.bcrypt;
const rateLimit = dependencies.rateLimit;
const jwt = dependencies.jwt;
const cipher = dependencies.cipher;

//THIS WE DONE BECAUSE WE WANT TO CALL SCHEMA INSIDE ANOTHER SCHEMA
const Schema = mongoose.Schema;

const token = new Schema({
    token: {
        type: String,
        required: true
    }
});

const addressSchema = new Schema({
    streetAddress : {
        type: String,
        maxLength: [100, "must be 100 character long"],
        trim: true,
        match: [/^[A-Za-z0-9 .-/]+$/, "Street address must contain letters (upper or lower case), space or dot operator or '-' operator, or '/' operator"],
        required: true
    },
    country: {
        type: String,
        required:true,

    },
    state:{
        type: String,
        required: true,
        trim: true,
        maxLength: [25, 'State must be 25 characters long']
    },
    city:{
        type: String,
        required: true,
        trim: true,
        maxLength: [25, 'City must be 25 characters long']
    },
    postalCode: {
        type: Number,
        required: true,
        trim: true,
        maxLength: [30, 'Postal code must be 30 character long']
    }
});

const registrationForm = new Schema({
    firstName: {
        type: String,
        maxLength : [50, 'First name must be 50 character long'],
        trim: true,
    },
    lastName: {
        type: String,
        maxLength: [50, 'First name must be 50 character long'],
        trim: true,
    },
    username: {
        type: String,
        maxLength: [50, 'Username must be 50 character long'],
        match: [/^[A-Za-z0-9 .]+$/, "Username must contain letters (upper or lower case), space or dot operator"],
        trim: true,
    },
    password : {
        type: String,
        maxLength: [30, 'Password length not more then 30 characters long'],
        trim : true,
        minLength: [8, 'Password must be at least 8 characters long'],
        maxLength: [128, 'Password must be less then 128 characters long']
    },
    loginCount: {
        type: Number,
        default : 0,
    },
    addmissionno : {
        type: Number,
        match: [/\d{10}/,"Addmission number should only have digits'"],
        minLength: [10,"Addmission number have maximum 10 digits"],
        trim: true,
        required: true,
        index: true,
        unique: true
    },
    address: [addressSchema],
    isActive: Boolean,
});

//THIS IS FOR UNIQUE VALUE ACCEPTOR
registrationForm.plugin(uniqueValidator, {message: '{PATH} : {VALUE} is already exists!!!'});


registrationForm.pre('save', async function(){
    const user = this;
    if(!user.isModified('password')){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
})

registrationForm.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

//GENERATE A JWT TOKEN
registrationForm.methods.generateAuthToken = async function() {
    try{
        // output encoding
        let encryptedData = cipher.update(this._id.toString(), "utf-8", "hex");
        encryptedData += cipher.final("hex");
        console.log("encrypted Data : " + encryptedData);
        const payload = {
            _id :  encryptedData,
            exp : Math.floor(Date.now() / 1000) + 60,
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        console.log("Token value : " + token);
        return token;
    } catch (error) {
        //res.send("Error while generating token : " + error);
        console.log("the error part : "  + error);
    }
}

registrationForm.statics.findByToken = async function(token) {
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded" +  decoded);
        return await this.findOne({ _id : decoded._id});
    } catch (error) {
        return error.message;
    }
}


//INCREMENT LOGIN COUNT WHEN USER LOGS IN
registrationForm.methods.incrementLoginCount = async function() {
    this.loginCount += 1;
    ("Login count : " + this.loginCount);
    return await this.save();
}
//=======================================



const registrationFormModel = mongoose.model('registrationForm', registrationForm);

module.exports = registrationFormModel;


module.exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts from this IP, please try again later'
})
