console.log('YOOO')
// import { app } from 'electron'
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'

console.log('Demo join', join(__dirname, './index.html'))

app.whenReady().then(() => {
  console.log('ready')
  process.exit(0)
})
