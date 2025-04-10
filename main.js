const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const aspectRatio = 65 / 93;

const createWindow = () => {
  const ratio = global.devicePixelRatio || 1;
  const width = 650*ratio;
  const height = 930*ratio;

  const win = new BrowserWindow({
    width: width,
    height: height,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('renderer/index.html');

  win.on('resize', () => maintainAspectRatio(win));
};

// maintain aspect ratio when resizing
function maintainAspectRatio(window) {
  const [width] = window.getSize();
  const height = Math.round(width/aspectRatio);
  window.setSize(width, height);
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});