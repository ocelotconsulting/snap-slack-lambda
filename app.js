'use strict'

const qs = require('querystring')
const config = require('./config/default.json')
const decrypt = require('./src/aws/iam/decrypt')
const sendMessage = require('./src/slack/sendMessage')
const findMessage = require('./src/slack/findMessage')
const deleteMessage = require('./src/slack/deleteMessage')
const getUserInfo = require('./src/slack/getUserInfo')
const sendResponse = require('./src/slack/sendResponse')

const doneObj = (err, res) => ({
  statusCode: err ? '400' : '200',
  body: err ? (err.message || err) : JSON.stringify(res),
  headers: {
    'Content-Type': 'application/json'
  }
})

const mission = (params) =>
  getUserInfo(config['bot-token'])(params.user_id)
  .then((user) => sendMessage(config['bot-token'])(params.channel_id, params.user_name, user.profile.image_48, params.text))
  .then(() => findMessage(config['bot-token'])(params.channel_id, params.user_name, params.text))
  .then((msg) => deleteMessage(config['bot-token'])(params.channel_id, msg.ts, 5000))

module.handler = (event, context) =>
  decrypt(new Buffer(config['encrypted-token'], 'base64'))
  .then((data) => {
    const token = data.Plaintext.toString('ascii')
    const params = qs.parse(event.body)
    const requestToken = params.token
    if (requestToken !== token) {
      console.error(`Request token (${requestToken}) does not match expected`)
      context.succeed(doneObj('Invalid request token'))
    }
    console.log('The params are: ', JSON.stringify(params))
    return sendResponse(config['bot-token'])(params.response_url, `${params.user_name} invoked ${params.command} in ${params.channel_name} with the following text: ${params.text}`)
    .then(() => mission(params))
    .then((data) => context.succeed(doneObj(null, `${params.user_name} invoked ${params.command} in ${params.channel_name} with the following text: ${params.text}`)))
  })
  .catch((err) => {
    console.log('Decrypt error:', err)
    context.succeed(doneObj(err))
  })
