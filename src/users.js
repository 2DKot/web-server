"use strict";

var models = require('./model/oauth_models');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
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
            console.log("oh yeas");
            res.status(200).json({
                message: "User was found.",
                user: user
            });
    });
});
