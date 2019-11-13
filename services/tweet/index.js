'use strict'

const S = require('fluent-schema')
const hyperid = require('hyperid')

async function statusService (fastify, opts) {
  const hyperid2 = hyperid()

  fastify.route({
    method: 'POST',
    path: '/tweet',
    handler: onTweet,
    schema: {
      response: {
        200: S.object().prop('tweet_id', S.string())
      }
    }
  })

  async function onTweet(req, reply) {
    const id = hyperid2();

    await this.elastic.index({
      index: 'tweets',
      refresh: 'wait_for',
      id,
      body: {
        id,
        text: req.body.message,
        user: req.body.user,
        time: new Date(),
        topics: [ req.body.topic ]
      }
    })

    return { tweet_id: id }
  }
}

module.exports = statusService
