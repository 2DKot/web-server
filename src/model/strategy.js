/// <reference path="../../typings/tsd.d.ts" />
"use strict";

var connection = require("./mongoose_connection");
var mogoose = require('mongoose')


var StrategySchema = new mogoose.Schema({
    userId: { type: String },
    source: { type: String },
    status: { type: String },
    class: { type: Buffer },
    errorMessage: { type: String },
    date: { type: Date, default: new Date() }
});

module.exports = connection.model('Strategies', StrategySchema);
