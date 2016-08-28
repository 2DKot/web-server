'use strict'
module.exports = function (routes, authMiddleware) {
  const express = require('express')
  const app = express()
  const bodyParser = require('body-parser')
  
  const oauthModule = require('./oauth')

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  const cors = require('./cors')
  app.use(cors)

  for (let route of routes) {
    if (route.router.public) app.use(route.url, route.router.public)
    if (route.router.private) app.use(route.url, authMiddleware, route.router.private)
    if (!route.router.public && !route.router.private) {
      console.log('WARNING: route', route.url, 'has no public neither private routes')
    }
  }

  const oauth = oauthModule.oauth

  app.all('/oauth/token', oauth.grant())

  app.use(function (err, req, res, next) {
    if (!err || err.name !== 'OAuth2Error') {
      res.status(500).json({message: err.message})
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
