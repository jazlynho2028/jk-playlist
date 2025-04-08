const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateTime: (callback) => ipcRenderer.on('update-time', callback),
});