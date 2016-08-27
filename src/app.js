'use strict'
module.exports = function (routes) {
  const express = require('express')
  const app = express()
  const bodyParser = require('body-parser')
  require('./model/mongoose_connection')

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  const cors = require('./cors')
  app.use(cors)

  for (let route of routes) {
    app.use(route.url, route.router)
  }

  const oauthModule = require('./oauth')
  const oauth = oauthModule.oauth

  app.all('/oauth/token', oauth.grant())

  app.use(function (err, req, res, next) {
    if (!err || err.name !== 'OAuth2Error') {
      next()
      return
    }
    var status = err.code
    if (err.message === 'User credentials are invalid') {
      status = 401
    }
    res.status(status).json(err)
  })

  return app
}
