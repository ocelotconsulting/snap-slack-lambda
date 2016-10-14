'use strict'

const invokeLambda = require('./src/aws/lambda/invokeLambda')
const config = require('./config/default.json')
const qs = require('querystring')

const slackResponse = (err, res) => ({
  statusCode: err ? '400' : '200',
  body: err ? (err.message || err) : JSON.stringify(res),
  headers: {
    'Content-Type': 'application/json'
  }
})

exports.handler = (event, context) => {
  const params = qs.parse(event.body)
  return invokeLambda(config['snap-slack-lambda-name'], event)
  .then(() => context.succeed(slackResponse(null, `${params.user_name} invoked ${params.command} in ${params.channel_name} with the following text: ${params.text}`)))
  .catch((err) => {
    console.log('Error invoking follow-on lambda:', err)
    context.succeed(slackResponse(err))
  })
}
