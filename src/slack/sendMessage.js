const agent = require('superagent-promise')(require('superagent'), Promise)
const querystring = require('querystring')

const sendMessage = (token) => (channel, username, icon_url, text) =>
  agent.get(`https://slack.com/api/chat.postMessage?${querystring.stringify({token, channel, username, icon_url, text})}`)
  .then((data) => {
    console.log(`Trying to send message: ${JSON.stringify(data.body)}`)
    return data.body
  })

module.exports = sendMessage
