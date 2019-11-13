'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('/me route is protected', (t) => {
  t.plan(2)
  const app = build(t)

  app.inject({
    url: '/me'
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 401)
  })
})

test('/me route is protected by basic auth', (t) => {
  t.plan(2)
  const app = build(t)

  app.inject({
    url: '/me',
    headers: {
      Authorization: "Basic YXJ5YTpzdGFyaw=="
    }
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
  })
})

// If you prefer async/await, use the following
//
// test('support works standalone', async (t) => {
//   const fastify = Fastify()
//   fastify.register(Support)
//
//   await fastify.ready()
//   t.equal(fastify.someSupport(), 'hugs')
// })
