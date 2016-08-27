'use strict'

const users = require('./repositories/users')

module.exports.authorizedUser = function (req, res, next) {
  req.user = users.user1
  next()
}

module.exports.anonymousUser = function (req, res, next) {
  res.status('401').json({ message: 'Not authorized.' })
  next()
}
