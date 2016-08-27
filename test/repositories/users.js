'use strict'

const user1 = {
  _id: 1,
  username: 'kot',
  email: 'kot@mail.ru',
  fullname: 'Костя',
  isSuperUser: false
}

module.exports.user1 = user1

const user2 = {
  _id: 2,
  username: 'admin',
  email: 'admin@aicontester',
  fullname: 'Женя',
  isSuperUser: false
}

module.exports.user2 = user2

module.exports.getById = function (id, callback) {
  console.log('in getById:', id)
  console.log(user1)
  if (id === '1') {
    return callback(null, user1)
  } else if (id === '2') {
    return callback(null, user2)
  } else {
    return callback(null, null)
  }
}

module.exports.getByNameOrEmail = function (username, email, callback) {
  if (username === 'kot') {
    return callback(null, user1)
  } else if (email === 'admin@aicontester') {
    return callback(null, user2)
  } else {
    return callback(null, null)
  }
}

module.exports.create = function (username, password, email, fullname, callback) {
  callback()
}


module.exports.update = function (user, callback) {
  callback(null, user)
}
