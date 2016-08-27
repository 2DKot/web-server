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
  collection.find({_id: o_id}, {password: 0}).limit(1).next(callback)
}

module.exports.getByNameOrEmail = function (username, email, callback) {
  let query = { $or: [{username: username}, {email: email}] }
  var collection = db.collection('users')
  collection.find(query).limit(1).next(callback)
}

module.exports.create = function (username, password, email, fullname, callback) {
  var collection = db.collection('users')
  collection.insertOne({
    username: username,
    password: password,
    email: email,
    fullname: fullname,
    isSuperUser: false
  }, callback)
}


module.exports.update = function (user, callback) {
  var collection = db.collection('users')
  collection.updateOne({_id: user._id}, { $set: {
    username: user.username,
    password: user.password,
    email: user.email,
    fullname: user.fullname
  }}, callback)
}
