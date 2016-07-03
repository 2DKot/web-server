"use strict";

var oauthserver = require('oauth2-server');

module.exports = { }

var oauth = oauthserver({
  model: require('./oauth_model'),
  grants: ['password'],
  debug: true,
  passthroughErrors: false
});

module.exports.oauth = oauth;


var oauth_models = require('./model/oauth_models');
var User = oauth_models.User;

var express = require('express');
var router = express.Router();

module.exports.getUser = router;
var mongoose = require('mongoose');

router.use(oauth.authorise());
router.use(function getUser(req, res, next) {
    console.log("I'm in getUser")
    User.findOne({ _id: new mongoose.Types.ObjectId(req.user.id) }, function(err, user) {
        if (err) {
            res.status(500).json({
                message: "Database error."
            });
            console.log(err.message);
            return;
        };
        if (!user) {
            res.status(404).json({
                message: "User with id " + req.user.id + " wasn't found."
            });
            return;
        }
        req.user = user;
        next();
    });
});
