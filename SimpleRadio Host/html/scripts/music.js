var music_muted = false
var musicIcon = document.getElementById("musicIcon")
var musicDots = []
var songs

for(let i = 0; i < 9; i++){
  musicDots.push(document.getElementById("music-dot-" + i.toString()))
}

musicDots.reverse()

function ToggleMusic() {
  music_muted = !music_muted
  if(music_muted) {
    musicIcon.src = "icons/music-muted.png"
  } else {
    musicIcon.src = "icons/music.png"
  }
}