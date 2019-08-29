
var mic_muted = false
var microphoneIcon = document.getElementById("microphoneIcon")
var micDots = []
var micAudioContext
var micStream

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

	micStream = microphoneStream
	RecordChunks()

	var mediaStreamSource = micAudioContext.createMediaStreamSource(microphoneStream)
	var processor = micAudioContext.createScriptProcessor(512, 1, 1)

	//mediaStreamSource.connect(micAudioContext.destination)
	mediaStreamSource.connect(processor)
	processor.connect(micAudioContext.destination)
	processor.onaudioprocess = function (e) {
		var inputData = e.inputBuffer.getChannelData(0)
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

async function RecordChunks() {

	const mediaRecorder = new MediaRecorder(micStream)
	mediaRecorder.start()

	const audioChunks = []

	mediaRecorder.addEventListener("dataavailable", event => {
		audioChunks.push(event.data)
	});

	mediaRecorder.addEventListener("stop", () => {
		RecordChunks()
		const audioBlob = new Blob(audioChunks)
		fetch(URL.createObjectURL(audioBlob)).then(function (res) {
			res.arrayBuffer().then(function (buffer) {
				var uint8View = new Uint8Array(buffer);
				ipcRenderer.send("microphone", uint8View)
			})
		})
	});

	setTimeout(() => {
		mediaRecorder.stop()
	}, 500)
}

