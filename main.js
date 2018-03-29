'use strict'

const { app, BrowserWindow, ipcMain, Tray, Menu, shell } = require('electron')
const path = require('path')
const { format } = require('url')
const server = require('./backend')
const config = require('./config')

const isProd = process.env.NODE_ENV.trim() === 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow
let tray = null

const externalUrl = {
  setting: 'https://github.com/zedwang/iCloud/',
  issue: 'https://github.com/zedwang/iCloud/issues',
  help: 'https://github.com/zedwang/iCloud/',
  about: 'https://github.com/zedwang/iCloud/',

}

function createMainWindow() {
  const window = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 600,
    minHeight: 450,
    frame: false,
    icon: './resource/logo@2x.png',
    transparent : true
  })

  if (!isProd) {
    window.webContents.openDevTools()
    window.loadURL('http://localhost:8597')
  }
  else {
    window.loadURL(format({
      pathname: path.join(__dirname, 'dist', 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
    tray.destroy()
  })

  window.on('show', () => {
    tray.setHighlightMode('always')
  })

  window.on('hide', () => {
    tray.setHighlightMode('never')
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}


function menuClick(menuItem, browserWindow, event) {
  console.log(menuItem.id)
  shell.openExternal(externalUrl[menuItem.id])
}


server.listen(config.get('api.port'), 'localhost', ()=> console.log(`API Server listening on port http://localhost:9527`))

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
    
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})



ipcMain.on('hidden-window', (event, args) => {
  if (!tray) {
      tray  = new Tray('./resource/logo.png')
  }
  tray.setToolTip('山寨云盘')
  mainWindow.hide();

  tray.on('right-click', () => {
      const contextMenu = Menu.buildFromTemplate([
          {id: 'setting', label: '设置', click: menuClick},
          {id: 'issue', label: '意见反馈', click: menuClick},
          {id: 'help', label: '帮助', click: menuClick},
          {id: 'about', label: '关于', click: menuClick},
          {id: 'setting', label: '退出', role: 'quit'}
        ])
        tray.setContextMenu(contextMenu)
  })
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
})

/**
 * 网络检测
 * 结合na
 */