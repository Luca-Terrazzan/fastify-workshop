'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('support a health checks route', (t) => {
  t.plan(2)
  const app = build(t)

  app.inject({
    url: '/status'
  }, (err, res) => {
    t.error(err)
    t.deepEqual(JSON.parse(res.payload), { status: 'ok' })
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
