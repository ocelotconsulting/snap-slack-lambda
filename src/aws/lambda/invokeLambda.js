const getLambda = require('../sdk/getLambda')

const invoke = (FunctionName, event) =>
  getLambda().invoke({FunctionName, InvocationType: 'Event', Payload: JSON.stringify(event, null, 2)}).promise()

module.exports = invoke
