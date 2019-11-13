'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const { hostname } = require('os')

module.exports = function (fastify, opts, next) {

  fastify.register(
    require('fastify-elasticsearch'), {
      cloud: {
        id: 'fastify-workshop:ZXVyb3BlLXdlc3QyLmdjcC5lbGFzdGljLWNsb3VkLmNvbSQzOGU4ZWI4ODY1ZmU0ZDI5OGY1Y2FiMmQzZjQ4OTc0MiRkMjYwZGYxNWExZjY0YWM1OTU2NjY1ZTJkOTk3OGNhOA=='
      },
      auth: {
        username: 'workshop',
        password: 'workshop-42'
      }
    }
  )

  fastify.register(
    require('@delvedor/fastify-workshop-dataset'),
    { indexName: `${hostname().replace(/[^-_A-Za-z0-9]/g, '_').toLowerCase()}-tweets` }
  )

  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })

  // Make sure to call next when done
  next()

}
