'use strict'

import test from 'ava'

const request = require('supertest')

const routes = [{url: '/users/', router: require('../src/routes/users.js')(require('./repositories/users.js'))}]

const app = require('../src/app')(routes)

test.cb('/users/1/ return user object', t => {
  request(app)
      .get('/users/1/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        t.falsy(err)
        t.is(res.status, 200, res.body.message)
        t.is(res.body.user._id, 1)
        t.is(res.body.user.username, 'kot')
        t.is(res.body.user.email, 'kot@mail.ru')
        t.is(res.body.user.fullname, 'Костя')
        t.is(res.body.user.isSuperUser, false)

        t.end()
      })
})

test.cb('/users/10/ return http-404', t => {
  request(app)
      .get('/users/10/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        t.falsy(err)
        t.is(res.status, 404, res.body.message)
        t.end()
      })
})
