var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var isFirstPacket = true
var bufferQueue = []
var bufferChunk = new Float32Array()

var io = io()

io.on('stream', function (data) {
	const audioBlob = new Blob([new Uint8Array(data, 0, data.length)]);
	const audioUrl = URL.createObjectURL(audioBlob)
	const audio = new Audio(audioUrl)
	audio.play()
})




