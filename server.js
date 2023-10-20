require('dotenv').config();

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