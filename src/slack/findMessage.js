const agent = require('superagent-promise')(require('superagent'), Promise)
const querystring = require('querystring')

const findMessage = (token) => (channel, username, text) =>
  agent.get(`https://slack.com/api/channels.history?${querystring.stringify({token, channel})}`)
  .then((data) => {
    console.log(`Trying to get history: ${JSON.stringify(data.body)}`)
    return data.body.messages.find((message) =>
      message.username === username &&
      message.subtype === 'bot_message' &&
      typeof message.attachments === 'undefined' &&
      message.text === text
    )
  })

module.exports = findMessage
