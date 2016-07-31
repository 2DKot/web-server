"use strict";

var models = require('./model/oauth_models');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var oauth_module = require('./oauth');
var getUser = oauth_module.getUser;
module.exports = router;

router.get("/:id", function(req, res, next) {
    console.log("intered in users/" + req.params.id);
    models.User.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, { password: 0 },
        (err, user) => {
            console.log("find complete");
            if (err) {
                res.status(500).json({
                    message: "Database error."
                });
                throw err;
            }
            console.log("there is no errors");
            if (!user) {
                console.log("not found");
                res.status(200).json({
                    message: "User wasn't found."
                });
                return;
            }
            res.status(200).json({
                message: "User was found.",
                user: user
            });
    });
});

router.put("/:id", getUser, function(req,res,next) {
    models.User.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, { password: 0 }, (err, user) => {
        console.log("find complete");
        if (err) {
            res.status(500).json({
                message: "Database error."
            });
            throw err;
        }
        console.log("there is no errors");
        if (!user) {
            console.log("user not found");
            res.status(200).json({
                message: "User wasn't found."
            });
            return;
        }
        if(req.body.fullname) {
            user.fullname = req.body.fullname
        }
        if(req.body.avatar) {
            console.error('Avatar saving not implemented yet.')
        }

        user.save(function(err, user) {
            if(err) {
                res.status(500).json({
                    message: "Database error."
                });
                throw err;
            }
            res.status(200).json({
                message: "User was updated.",
                user: user
            });
        });
    });
});