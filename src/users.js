'use strict'
var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient
var assert = require('assert')

// Connection URL
var url = 'mongodb://localhost:27017/test'

var db
// Use connect method to connect to the server
MongoClient.connect(url, function (err, recieved_db) {
  assert.equal(null, err)
  console.log('Connected succesfully to server')
  db = recieved_db
})

module.exports.getById = function (id, callback) {
  var collection = db.collection('users')
  // Find some documents
  var o_id = new mongodb.ObjectID(id)
  collection.find({_id: o_id}).limit(1).next(callback)
}

module.exports.getByName = function (name, callback) {
  var collection = db.collection('users')
  // Find some documents
  collection.find({username: name}).limit(1).next(callback)
}
