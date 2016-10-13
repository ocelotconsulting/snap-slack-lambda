const agent = require('superagent-promise')(require('superagent'), Promise)
const querystring = require('querystring')

const getUserInfo = (token) => (user) =>
  agent.get(`https://slack.com/api/users.info?${querystring.stringify({token, user})}`)
  .then((data) => {
    console.log(`Received user info: ${JSON.stringify(data.body.user)}`)
    return data.body.user
  })

module.exports = getUserInfo
