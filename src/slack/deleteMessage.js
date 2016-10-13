const agent = require('superagent-promise')(require('superagent'), Promise)
const querystring = require('querystring')

const delayPromise = (delay) => (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => { resolve(data) }, delay)
  })

const deleteMessage = (token) => (channel, ts, delay) =>
  Promise.resolve().then(delayPromise(delay))
  .then(() => agent.get(`https://slack.com/api/chat.delete?${querystring.stringify({token, channel, ts})}`)
    .then((data) => {
      console.log(`Received: ${JSON.stringify(data)}`)
      return data
    })
  )

module.exports = deleteMessage
