
//Requirements
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var http = require('http')
const dgram = require('dgram')

const hostServer = dgram.createSocket('udp4')
const clientApp = express()

const hostServerPort = 13337
const clientPort = 80

//Set up the app engine
clientApp.engine('.html', require('ejs').__express)
clientApp.set('view engine', 'html')
clientApp.use(bodyParser.urlencoded({ extended: false }))
clientApp.use(bodyParser.json())
clientApp.use(express.static(path.join(__dirname, "/Client")))

http = http.Server(clientApp)

http.listen(clientPort, function() {
  console.log("Website server listening on port: " + clientPort)
})

clientApp.get('/', function(req, res) {
  res.render(path.join(__dirname, '/Client', '/index.html'))
})

/*
  Set up audio streaming to the clients 
*/

const io = require('socket.io')(http)

io.on('connection', function(socket){
  console.log("New listener")
})



/*
  This is used to set up the stream from the radio host to the server
*/
hostServer.on('error', function (err) {
  console.log("Host server error: " + err.stack)
  hostServer.close()
})

hostServer.on('message', function(data, client) {
  io.emit('stream', data)
})

hostServer.bind(hostServerPort)