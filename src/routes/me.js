'use strict'
module.exports = function () {
  var express = require('express')
  var router = express.Router()

  router.all('/', function (req, res) {
    console.log('user:')
    console.log(req.user)
    res.status(200).json({
      user: req.user
    })
  })
  return { private: router }
}
