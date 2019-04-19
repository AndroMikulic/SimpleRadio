
var mic_muted = false
var microphoneIcon = document.getElementById("microphoneIcon")
var micDots = []
var micAudioContext
var mediaRecorder

for (let i = 0; i < 9; i++) {
  micDots.push(document.getElementById("mic-dot-" + i.toString()))
}
micDots.reverse()

function ToggleMicrophone() {
  mic_muted = !mic_muted
  if (mic_muted) {
    microphoneIcon.src = "icons/mic-muted.png"
  } else {
    microphoneIcon.src = "icons/mic.png"
  }
}

var constraints = { audio: true, video: false }
navigator.mediaDevices.getUserMedia(constraints).then(function (microphoneStream) {
  micAudioContext = new AudioContext()
  var mediaStreamSource = micAudioContext.createMediaStreamSource(microphoneStream)
  var processor = micAudioContext.createScriptProcessor(1024, 1, 1)

  //mediaStreamSource.connect(micAudioContext.destination)
  mediaStreamSource.connect(processor)
  processor.connect(micAudioContext.destination)
  processor.onaudioprocess = function (e) {
    var inputData = e.inputBuffer.getChannelData(0)
    convertFloat32ToInt16(inputData)
    var inputDataLength = inputData.length
    var total = 0
    for (var i = 0; i < inputDataLength; i++) {
      total += Math.abs(inputData[i++])
    }
    var rms = Math.sqrt(total / inputDataLength)
    for (var i = 0; i < 9; i++) {
      if (i < Math.floor(rms * 16)) {
        micDots[i].style = "background-color: white;"
      } else {
        micDots[i].style = "background-color: rgba(255, 255, 255, 0.5);"
      }
    }
  }
})

function convertFloat32ToInt16(buffer) {
    l = buffer.length
    buf = new Int16Array(l)
    while (l--) {
      buf[l] = Math.min(1, buffer[l])*0x7FFF
    }
    console.log(buf.buffer)
    ipcRenderer.send("microphone", new Uint8Array(buf.buffer))
  }