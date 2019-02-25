var stream_toggle = false
var streamBtn = document.getElementById("streamBtn")

function ToggleStream() {
  stream_toggle = !stream_toggle
  if(stream_toggle) {
    streamBtn.style = "display:inline-block; margin-right: 16px; background: radial-gradient(rgb(100, 255, 100, 0.5), transparent);"
  } else {
    streamBtn.style = "display:inline-block; margin-right: 16px; background: radial-gradient(rgb(255, 100, 100), transparent);"
  }
}