var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source = audioCtx.createBufferSource();

var io = io()

io.on('stream', function (data) {
  //This does not work, decodeAudioData() failes to decode.
  audioCtx.decodeAudioData(data, function (buffer) {
    source.buffer = buffer;
  },
    function (e) {
      console.log(e)
    })
})

source.connect(audioCtx.destination)
