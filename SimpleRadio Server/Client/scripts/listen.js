
var micOutput = document.getElementById("mic")
var io = io()
var context = new AudioContext()
var bufferQueue = []

io.on('stream', function (data) {
    var buffer = data.data
    console.log(buffer)
})