require('dotenv').config()

const dependencies = require('./dependencies');

const express = dependencies.express;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const app = express();
const server = require('http').Server(app);
const port = 3000;
const dbConnection = require('./dbconnection/connection');
const routeApi = require('./routes/index');
const helmet = require('helmet');
const cors = require('cors');

app.use(cors());
/**
 * THIS IS USED FOR CROSS ORIGIN REQUEST 
 */
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended : true }))
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))
app.use(cookieParser());

app.use('/dbConnection', dbConnection);
app.use('/', routeApi);


app.options('*', function(req, res){
    res.sendStatus(200);
});

server.listen(port, (err) => {
    if(err) {
        throw err;
    }
    console.log('Node endpoint working')
});

module.exports = server;