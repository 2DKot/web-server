"use strict";

var connection = require("./mongoose_connection");
var mongoose = require('mongoose')


var StrategySchema = new mongoose.Schema({
    userId: { type: String },
    source: { type: String },
    status: { type: String,
              enum: 'error compiling accepted'.split(' ') 
            },
    executable: { type: Buffer },
    errorMessage: { type: String },
    date: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Strategies', StrategySchema);
