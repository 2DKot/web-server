"use strict";
var oauth_module = require('./oauth');
var getUser = oauth_module.getUser;
var UserModel = require('./model/oauth_models').UserModel;
var StrategyModel = require('./model/strategy');
var needle = require('needle')
var express = require('express');
var router = express.Router();
var config = require('../config.json');

module.exports = router;

router.post("/", getUser, function(req, res, next) {
    function paramNotFound(paramName) {
        res.status(400).json({
            message: 'Need for ' + paramName + ' in request body!'
        });
    };
    
    var source = req.body.source;

    if(!source) {
        paramNotFound('source');
        return;
    }
    
    
    var strategy = new StrategyModel({
        source: source,
        userId: req.user.id,
        status: "compiling",
    });
    
    strategy.save((err, result) => {
        if (err) {
            res.status(500).json({
                message: "Database error."
            });
            throw err;
        }
        
        res.status(200).json({
           message: "Strategy was sended to compilation." 
        });
    });

    needle.post(config.compilation_server.url + '/compile', {source: source},
        {json: true},
        function(error, response) {
            if(error) {
                throw error;
            }
            var body = response.body;
            if(body.status == 'error') {
                strategy.status = 'error';
                strategy.errorMessage = body.errorMessage;
            } else if(body.status == 'accepted') {
                strategy.status = 'accepted';
                strategy.executable = body.executable.data;
                console.log(body.executable.data);
            } else {
                throw new Error('unexpected compilation status ' + body.status);
            }
            strategy.save((err, result) => {
                if (err) {
                    throw err;
                }
            });
        }
    );
});

router.get("/", function(req, res, next) {
    StrategyModel.find({}, {class: 0} , (err, strategies) => {
        if (err) {
            res.status(500).json({
                message: "Database error."
            });
            throw err;
        }
        res.status(200).json({
            message: "Finded " + strategies.length + " strategies",
            strategies: strategies
        });
    });
});