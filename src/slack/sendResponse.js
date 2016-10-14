const agent = require('superagent-promise')(require('superagent'), Promise)

const sendResponse = (token) => (url, text) => agent.post(url).send({text})

module.exports = sendResponse
