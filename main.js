const { ipcMain } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const fs = require('fs')


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
    ,show:false
  })
  win.setMenu(null)
  win.webContents.openDevTools()

  win.show()
  win.loadFile('index.html')
}



ipcMain.on('loadData', (event) => {
  if(!fs.existsSync('data.json')){
    fs.writeFileSync('data.json', '{"users": [], "nombre": 0}')
  }
  let jData;
  if(fs.readFileSync('data.json').indexOf('}') === -1){
    fs.writeFileSync('data.json', '{"users": [], "nombre": 0}')
  }
  jData = JSON.parse(fs.readFileSync('data.json'))
  event.returnValue = jData
})

ipcMain.on('saveData', (event, arg) => {
  let jData = JSON.parse(fs.readFileSync('data.json'))
  jData.users.push(arg)
  jData.nombre += 1
  fs.writeFileSync('data.json', JSON.stringify(jData))
  event.returnValue = 'saved'
})

ipcMain.on('removeData', (event, index) => {
  let jData = JSON.parse(fs.readFileSync('data.json'))
  if(jData.nombre === 0){
    event.returnValue = 'empty'
    return
  }
  jData.users.splice(index, 1)
  jData.nombre -= 1
  fs.writeFileSync('data.json', JSON.stringify(jData))
  event.returnValue = 'removed'
}
)

ipcMain.on('saveFile', (event, file) => {
  try {
    const csvData = fs.readFileSync(file, 'utf-8');
    event.returnValue = 'success';
  } catch (error) {
    event.returnValue = 'error';
  }
});

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})