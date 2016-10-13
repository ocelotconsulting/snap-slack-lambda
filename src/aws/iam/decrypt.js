const getKMS = require('../sdk/getKMS')

const decrypt = (CiphertextBlob) =>
  getKMS().decrypt({CiphertextBlob}).promise()
  .catch((e) => {
    console.log(`Couldn't decrypt blob`)
    throw e
  })

module.exports = decrypt
