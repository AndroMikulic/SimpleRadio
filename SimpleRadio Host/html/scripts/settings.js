
var settings
var settings_toggle = false
var settingsDiv = document.getElementById("settings")
var mainDiv = document.getElementById("main")

ipcRenderer.on("loadSettings", function(event, arg) {
  try {
    settings = JSON.parse(arg)
    document.getElementById("serverIP").value = settings["serverIP"]
    document.getElementById("musicFolder").innerHTML = settings["folderName"]
  } catch {
    console.log("No data to load")
  }
})

function ToggleSettings() {
  settings_toggle = !settings_toggle
  if(settings_toggle) {
    mainDiv.className = "fade-out"
    setTimeout(() => {
      mainDiv.class = "deactivate"
      settingsDiv.className = "activate"
      setTimeout(() => {
        settingsDiv.className = "fade-in"
      }, 100);
    }, 150);
  } else {
    settingsDiv.className = "fade-out"
    setTimeout(() => {
      settingsDiv.style = "deactivate"
      mainDiv.className = "activate"
      setTimeout(() => {
        main.className = "fade-in"
      }, 100);
    }, 150);
  }
}

function SaveSettings() {
  var fPath
  var fName
  try {
    fPath = document.getElementById("folderDialog").files[0].path
    fName = document.getElementById("folderDialog").files[0].name
  } catch {
    fPath = settings["folderpath"]
    fName = settings["folderName"]
  }
  var settingsData = {
    folderPath: fPath,
    folderName: fName,
    serverIP: document.getElementById("serverIP").value,
    password: document.getElementById("password").value
  }

  ipcRenderer.send("saveSettings", settingsData)
  document.getElementById("savedIndicator").style = "opacity: 1"
  setTimeout(() => {
    document.getElementById("savedIndicator").style = "opacity: 0"
  }, 1500)
}

function SelectMusicFolder() {
  document.getElementById("folderDialog").click()
}

function ShowSelectedMusicFolder() {
  document.getElementById("musicFolder").innerHTML = document.getElementById("folderDialog").files[0].name
}