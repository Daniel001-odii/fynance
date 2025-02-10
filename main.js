const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.loadFile('dist/index.html'); // Load built Vue files
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());