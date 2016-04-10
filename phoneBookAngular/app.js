/**
 * Created by User on 07.04.2016.
 */
'use strict';
var express = require('express');
var dataService = require('./fileDataService');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('express-favicon');
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(require('express-promise')());
var router = express.Router();

router.get('/', function (req, res) {
    res.json({message: 'welcome to our api!'});
});

app.use('/api', router);

router.route('/items')

    .get(function (req, res) {
        res.send(dataService.getAll());
    })

    .post(function (req, res) {
        res.send(dataService.save(req.body));
    });

router.route('/init')

    .post(function (req, res) {
        res.send(dataService.init(req.body));
    });


router.route('/items/:id')

    .get(function (req, res) {

    })

    .put(function (req, res) {
        res.send(dataService.save(req.body));
    })

    .delete(function (req, res) {
        res.send(dataService.del(req.params.id));
    });


app.use(function (req, res, next) {
    res.status(404);
    res.send({error: 'Not found'});
    return;
});

app.use(function (err, req, res, next) {

    res.status(err.status || 500);
    res.send({error: err.message});
    return;
});

app.listen(80, function () {
    console.log('Example app listening on port 80!');
});
