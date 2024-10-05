console.log('Start time', new Date().toISOString())
import { app, shell, BrowserWindow, ipcMain } from 'electron'
console.log('Post import', new Date().toISOString())

// import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import icon from '../../resources/icon.png?asset'

async function createWindow(): Promise<void> {
  console.log('Create window', new Date().toISOString())

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 670,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      // preload: join(__dirname, '../preload/index.js'),
    },
  })
  console.log('Window created', new Date().toISOString())

  mainWindow.on('ready-to-show', () => {
    console.log('Ready to show', new Date().toISOString())

    // app.quit()
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.

  // import { join } from 'path'

  mainWindow.loadURL('http://localhost:9527/renderer')
  console.log('Loaded URL', new Date().toISOString())

  return
  const { join } = await import('path')
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.loadURL('localhost:9527/renderer')
    console.log('load remote url', process.env['ELECTRON_RENDERER_URL'])
    if (process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      const location = join(__dirname, './renderer.html')
      console.log('load local html file1 ', location)
      mainWindow.loadFile(location)
    }
  } else {
    const location = join(__dirname, './renderer.html')
    console.log('load local html file2', location)
    mainWindow.loadFile(location)
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  // electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    // optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
