const agent = require('superagent-promise')(require('superagent'), Promise)

const sendResponse = (token) => (url, text) => {
  console.log(`Trying to post back to slack: ${JSON.stringify(text)}`)
  return agent.post(url)
  .send({text})
  .then((data) => {
    console.log(`Sent early response: ${JSON.stringify(data.body)}`)
    return data.body
  })
}

module.exports = sendResponse
