var logger = require('morgan')
logger.token('id', function getId (req, res) {
  return req['Accept']
})

const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time'
logger(loggerFormat, {
  skip: function (req, res) {
    return res.statusCode < 400
  },
  stream: process.stderr
})

logger(loggerFormat, {
  skip: function (req, res) {
    return res.statusCode >= 400
  },
  stream: process.stdout
})
module.exports = logger
