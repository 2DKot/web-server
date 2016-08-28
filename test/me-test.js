'use strict'

import test from 'ava'

const request = require('supertest')

const routes = [{url: '/me/', router: require('../src/routes/me.js')()}]

const fakeAuth = require('./fake-auth')

const app = require('../src/app')

test.cb('/me/ for authorized user return user object', t => {
  request(app(routes, fakeAuth.authorizedUser))
    .get('/me/')
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 200, res.body.message)
      t.truthy(res.body.user)
      t.is(res.body.user._id, 1)
      t.is(res.body.user.username, 'kot')
      t.is(res.body.user.email, 'kot@mail.ru')
      t.is(res.body.user.fullname, 'Костя')
      t.is(res.body.user.isSuperUser, false)
      t.end()
    })
})


test.cb('/me/ for unauthorized user return http-401', t => {
  request(app(routes, fakeAuth.anonymousUser))
    .get('/me/')
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 401, res.body.message)
      t.end()
    })
})
