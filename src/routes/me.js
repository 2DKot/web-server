'use strict'
var oauth_module = require('../oauth')
var getUser = oauth_module.getUser
var express = require('express')
var router = express.Router()
module.exports.router = router

router.all('/', getUser, function (req, res) {
  console.log('user:')
  console.log(req.user)
  res.status(200).json({
    user: req.user
  })
})
