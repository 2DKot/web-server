/// <reference path="../typings/tsd.d.ts" />
"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('./cors');
app.use(cors);

var registration = require('./registration');
app.use(registration);

var strategies = require('./strategies');
app.use('/strategies/', strategies);

var users = require('./users');
app.use('/users/', users);

var router = express.Router();

router.get('/hello/:name', function(req, res, next) {
    //There is no need to check that name param isn't undefined.
    //Request /hello/ wouldn't handled by this router.
    
    res.json({
        status: "ok",
        message: "Привет, " + req.params.name + "!"
    });
});

router.post('/test', function(req, res, next) {
    console.log(req.headers);
    console.log(req.body);
    res.end();
});

app.use(router);

var oauthModule = require('./oauth');
var oauth = oauthModule.oauth;
var getUser = oauthModule.getUser;

app.all('/oauth/token', oauth.grant());

app.use(function(err, req, res, next) {
    if(!err || err.name !== "OAuth2Error") {
        next();
        return;
    }
    var status = err.code;
    if(err.message === 'User credentials are invalid') {
        status = 401;
    }
    res.status(status).json(err);
})

var Response = express.Response;

app.all('/me', getUser, function(req, res) {
    console.log('user:');
    console.log(req.user);
    res.status(200).json({
        user: req.user
    });
});

//app.use(oauth.errorHandler());

app.listen(3000, function () {
  console.log('Backend-server listening on port 3000!');
});
