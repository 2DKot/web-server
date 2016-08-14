'use strict'

module.exports = function (usersRepository) {
  var models = require('../model/oauth_models')
  var express = require('express')
  var router = express.Router()
  var mongoose = require('mongoose')
  var oauth_module = require('../oauth')
  var getUser = oauth_module.getUser

  router.get('/:id', function (req, res, next) {
    console.log('intered in users/' + req.params.id)
    usersRepository.getById(req.params.id, (err, user) => {
      console.log('find complete')
      if (err) {
        res.status(500).json({
          message: 'Database error.'
        })
        throw err
      }
      console.log('there is no errors')
      if (!user) {
        console.log('not found')
        res.status(200).json({
          message: 'User wasn\'t found.'
        })
        return
      }
      res.status(200).json({
        message: 'User was found.',
        user: user
      })
    })
  })

  router.put('/:id', getUser, function (req, res, next) {
    models.User.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) }, { password: 0 }, (err, user) => {
      console.log('find complete')
      if (err) {
        res.status(500).json({
          message: 'Database error.'
        })
        throw err
      }
      console.log('there is no errors')
      if (!user) {
        console.log('user not found')
        res.status(200).json({
          message: 'User wasn\'t found.'
        })
        return
      }
      if (req.body.fullname) {
        user.fullname = req.body.fullname
      }
      if (req.body.avatar) {
        console.error('Avatar saving not implemented yet.')
      }

      user.save(function (err, user) {
        if (err) {
          res.status(500).json({
            message: 'Database error.'
          })
          throw err
        }
        res.status(200).json({
          message: 'User was updated.',
          user: user
        })
      })
    })
  })

  router.post('/', function (req, res, next) {
    function paramNotFound (paramName) {
      res.status(400).json({
        status: 400,
        message: 'Need for ' + paramName + ' in request body!'
      })
    };

    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let fullname = req.body.fullname
    if (!username) {
      paramNotFound('username')
      return
    };
    if (!password) {
      paramNotFound('password')
      return
    };
    if (!email) {
      paramNotFound('email')
      return
    };

    let query = { $or: [{username: username}, {email: email}] }
    models.User.findOne(query, function (err, existing_user) {
      if (err) {
        res.status(500).json({
          status: 500,
          message: 'Database error.'
        })
        throw err
      }
      if (existing_user) {
        let conflictPart
        if (existing_user.username === username) {
          conflictPart = 'username'
        } else if (existing_user.email === email) {
          conflictPart = 'email'
        }
        res.status(409).json({
          status: 409,
          alreadyExists: conflictPart
        })
        return
      }
      let user = new models.User({
        username: username,
        password: password,
        email: email,
        fullname: fullname,
        isSuperUser: false
      })
      user.save(function (err) {
        if (err) {
          res.status(500).json({
            status: 500,
            message: 'Database error.'
          })
          throw err
        }
        res.status(201).json({
          status: 201,
          message: 'User ' + username + ' was successfully registered.'
        })
      })
    })
  })

  return router
}
