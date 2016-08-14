'use strict'
var express = require('express')
var router = express.Router()

module.exports = router

router.all('/*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization')
  console.log(req.method, req.path)
  next()
})

router.options('/*', function (req, res, next) {
  res.statusCode = 204
  res.end()
})
