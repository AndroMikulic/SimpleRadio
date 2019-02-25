var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source = audioCtx.createBufferSource();

var io = io()

io.on('stream', function (data) {
  audioCtx.decodeAudioData(data, function (buffer) {
    source.buffer = buffer;
  },
    function (e) {
      console.log("PENIS " + e)
    })
})

source.connect(audioCtx.destination)
