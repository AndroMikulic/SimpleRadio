
var micOutput = document.getElementById("mic")
var io = io()
var context = new AudioContext()

function playMic() {
    console.log("playing")
    micOutput.play()
}

var globalBuffers = new Uint8Array()

io.on('stream', function (data) {
    var buffer = data.data
    globalBuffers = new Uint8Array( buffer.byteLength + globalBuffers.byteLength );
    globalBuffers.set( new Uint8Array( globalBuffers ), 0 );
    globalBuffers.set( new Uint8Array( buffer ), buffer.byteLength );
    console.log(data.data)
})

setTimeout(() => {


    var src = context.createBufferSource();

    var audioBuffer = context.createBuffer(1, globalBuffers.byteLength, context.sampleRate);

    audioBuffer.getChannelData(0).set(new Uint8Array(globalBuffers))

    globalBuffers = new ArrayBuffer()

    src.buffer = audioBuffer;

    console.log(audioBuffer)

    src.connect(context.destination);
}, 100);