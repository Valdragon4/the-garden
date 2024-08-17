window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })
const { contextBridge,ipcMain, ipcRenderer } = require('electron')

let saveData = (user) => {
    console.log(user);
    ipcRenderer.send('saveData', user)
};

let loadData = () => {
    let data = ipcRenderer.sendSync('loadData')
    return data
};

let removeData = (index) => {
    ipcRenderer.send('removeData', index)
};

let draft = () => {
    ipcRenderer.send('draft')
}

let saveFile = (file) => {
    ipcRenderer.send('saveFile', file)
}

let bridge = {
    saveData,
    loadData,
    removeData,
    draft,
    saveFile
};

contextBridge.exposeInMainWorld('Bridge', bridge);