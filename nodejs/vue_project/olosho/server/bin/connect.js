var app = require('../server')
var debug = require('debug')('olosho')
var http = require('http')
var port = normalizePort(process.env.PORT || '3000')
var server = http.createServer(app)
const mongoose = require('mongoose')
const uri = 'mongodb://localhost:27017/olosho'

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we are connected')
  server.listen(port, listen)
  server.on('error', onError)
  server.on('listening', onListening)
})

function normalizePort (val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}
function listen () {
  console.log(`Server started on port ${port}`)
}
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      /*  process.exit(1) */
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      /*   process.exit(1) */
      break
    default:
      throw error
  }
}

function onListening () {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}
