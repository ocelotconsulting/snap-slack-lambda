const agent = require('superagent-promise')(require('superagent'), Promise)

const getOAuthToken = (token) => (channelId) =>
  agent.get(`https://slack.com/api/channels.history`)
  .send(`token=${token}`)
  .send(`channel=${channelId}`)

module.exports = getOAuthToken
