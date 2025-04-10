const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  onUpdateTime: (callback) => ipcRenderer.on('update-time', callback),
  }
);