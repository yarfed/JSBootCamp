/**
 * Created by User on 07.04.2016.
 */
'use strict';
var express = require('express');
var dataService = require('./fileDataService');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('build'));
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

router.route('/items/:id')

    .get(function (req, res) {
        res.send(dataService.getById(req.params.id));
    })

    .delete(function (req, res) {
        res.send(dataService.del(req.params.id));
    });

router.route('/items/:id/items')
    .get(function (req, res) {
        res.send(dataService.getChilds(req.params.id));
    });

router.route('/search/:request')
    .get(function (req, res) {
        res.send(dataService.search(req.params.request));
    });

app.get("/*", function (req, res, next) {
    res.sendFile(__dirname + '/src/index.html');
});

app.use(function(err, req, res, next) {
    res.status(404).send('item not found');
});

app.listen(80, function () {
    console.log('My app listening on port 80!');
});
