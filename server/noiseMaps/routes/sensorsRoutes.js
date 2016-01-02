var express = require('express');
var router = express.Router();
var models = require('../models');
/* GET users listing. */
router.get('/api/sensor/', function(req, res) {
    
    models.sensor.findAll().then(function(sensors) {
            console.log("findall sensors");
            res.send(sensors);
        })
        .catch(function(error) {
            console.log(error);
            // Ooops, do some error-handling
            res.status(401).send({
                message: error
            });
        });
});


module.exports = router;
