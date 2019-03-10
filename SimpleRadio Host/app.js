const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron');
const fs = require('fs')

const dgram = require('dgram')
let microphoneStream = dgram.createSocket('udp4')
let musicStream = dgram.createSocket('udp4')

var serverIP = "127.0.0.1"
var micPort = 13337
var musicPort = 13338


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ 'minWidth': 800, 'minHeight': 600 })

  // and load the index.html of the app.
  mainWindow.loadFile('html/app.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  mainWindow.webContents.on('did-finish-load', function () {
    loadSettings()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('saveSettings', function (event, arg) {
  try { 
    fs.writeFileSync('settings', JSON.stringify(arg), 'utf-8'); 
  } catch(e) { }
})

ipcMain.on('microphone', function(event, arg) {
  microphoneStream.send(arg, micPort, serverIP, function(err, bytes){
    if (err) {
      throw err;
    }
  })
})

function loadSettings() {
  fs.readFile('settings', 'utf8', function(err, settings) {
    mainWindow.webContents.send('loadSettings', settings)
  });
}