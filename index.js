var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var dataHandler = require('./dataHandler');

var app = express();

//Avoid cross origin issues
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json.
app.use(bodyParser.json());

//Host the front-end app
app.use('/', express.static(config.clientDeploymentFolder));

// Serve json data from file loaded to datajson
app.get("/api/v1/get-contacts", function (req, res, next) {
    dataHandler.getAll().then((data)=>{
        var response = {};
        response.status = 'success';
        response.data = data;
        res.send(response);        
    },(err)=>{
        res.status(400);
        res.send(err);
    })
});

app.post('/api/v1/save-contacts', function (req, res) {

    var contactData = dataHandler.save(req.body);
    contactData.then( (data) => {
        var response = {};
        response.status = 'success';
        response.data = data;
        res.send(response);
    }, (err) => {
        res.status(400);
        res.send(err);
    });

});

//Listening to configured port
app.listen(config.clientPort, function () {
    console.log('Listening to ' + config.clientPort + '!');
});