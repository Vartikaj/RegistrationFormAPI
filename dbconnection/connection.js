const dependencies = require('../dependencies');

const router = dependencies.router;
const mongoose = dependencies.mongoose;

const dbConnect  = 'mongodb://127.0.0.1:27017/StudentDetails';
mongoose.Promise = global.Promise;

mongoose.connect(dbConnect, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('Connect to Mongodb');
}).catch((error) => {
    console.error('Error connecting to mongoDb:', error )
})

module.exports = router;

