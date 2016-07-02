"use strict";
var oauth_module = require('./oauth');
var getUser = oauth_module.getUser;
var UserModel = require('./model/oauth_models').UserModel;
var StrategyModel = require('./model/strategy');

var express = require('express');
var router = express.Router();
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