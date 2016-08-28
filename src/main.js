'use strict'

const routesNames = require('./routes')
let routes = []
for (let route of routesNames) {
  let repositories = []
  for (let repoName of route.repositories) {
    repositories.push(require('./repositories/' + repoName + '.js'))
  }
  routes.push({
    url: '/' + route.name + '/',
    router: require('./routes/' + route.name).apply(null, repositories)
  })
}

const oauthModule = require('./oauth')
const app = require('./app')(routes, oauthModule.getUser)

require('./model/mongoose_connection')

app.listen(3000, function () {
  console.log('Backend-server listening on port 3000!')
})
