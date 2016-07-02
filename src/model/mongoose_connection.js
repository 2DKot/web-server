"use strict";

var mongoose = require('mongoose');
var url = require('url');
var dockerUrl = process.env.MONGO_PORT && url.parse(process.env.MONGO_PORT);;
var ip = dockerUrl && dockerUrl.hostname ||
         '127.0.0.1';
var port = dockerUrl && dockerUrl.port ||
         '27017';
var uristring = 'mongodb://' + ip + ':'+ port +'/test';

module.exports = mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});
