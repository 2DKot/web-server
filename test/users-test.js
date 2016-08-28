'use strict'

import test from 'ava'

const request = require('supertest')

const routes = [{url: '/users/', router: require('../src/routes/users.js')(require('./repositories/users.js'))}]

const fakeAuth = require('./fake-auth')

const authorized = require('../src/app')(routes, fakeAuth.authorizedUser)
const anonymous = require('../src/app')(routes, fakeAuth.anonymousUser)

test.cb('/users/1/ return user object', t => {
  request(anonymous)
    .get('/users/1/')
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
  request(anonymous)
    .get('/users/10/')
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 404, res.body.message)
      t.end()
    })
})

test.cb('Sign up correct', t => {
  request(anonymous)
    .post('/users/')
    .send({
      username: 'jenya',
      password: '123',
      email: 'jenya@mail.com'
    })
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 201, res.body.message)
      t.end()
    })
})

test.cb('Sign up missed username', t => {
  request(anonymous)
    .post('/users/')
    .send({
      password: '123',
      email: 'jenya@mail.com'
    })
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 400, res.body.message)
      t.regex(res.body.message, /Need.+username/i)
      t.end()
    })
})

test.cb('Sign up missed email', t => {
  request(anonymous)
    .post('/users/')
    .send({
      username: 'jenya',
      password: '123'
    })
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 400, res.body.message)
      t.regex(res.body.message, /Need.+email/i)
      t.end()
    })
})

test.cb('Sign up missed password', t => {
  request(anonymous)
    .post('/users/')
    .send({
      username: 'jenya',
      email: 'jenya@mail.com'
    })
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 400, res.body.message)
      t.regex(res.body.message, /Need.+password/i)
      t.end()
    })
})

test.cb('Sign up username conflict', t => {
  request(anonymous)
    .post('/users/')
    .send({
      username: 'kot',
      password: '123',
      email: 'jenya@mail.com'
    })
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 409, res.body.message)
      t.end()
    })
})

test.cb('Sign up email conflict', t => {
  request(anonymous)
    .post('/users/')
    .send({
      username: 'jenya',
      password: '123',
      email: 'kot@mail.ru'
    })
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 409, res.body.message)
      t.end()
    })
})

test.cb('Modify user full name', t => {
  request(authorized)
    .put('/users/1/')
    .send({
      fullname: 'jenya'
    })
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 200, res.body.message)
      t.end()
    })
})

test.cb('Modify user by anonymous', t => {
  request(anonymous)
    .put('/users/1/')
    .send({
      fullname: 'jenya'
    })
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 401, res.body.message)
      t.end()
    })
})

test.cb('Modify another user', t => {
  request(authorized)
    .put('/users/2/')
    .send({
      fullname: 'jenya'
    })
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 403, res.body.message)
      t.end()
    })
})

test.cb('Modify unexisting user', t => {
  request(authorized)
    .put('/users/10/')
    .send({
      fullname: 'jenya'
    })
    .end(function (err, res) {
      t.falsy(err)
      t.is(res.status, 403, res.body.message)
      t.end()
    })
})
