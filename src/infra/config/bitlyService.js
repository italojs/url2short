const env = require('sugar-env')
require('dotenv').config()

module.exports = {
  accessKey: env.get(['BITLY_ACCESS_KEY'], ''),
}
