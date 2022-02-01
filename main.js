const { app, BrowserWindow, inAppPurchase } = require("electron");
const path = require("path");

gun = (Gun = require("gun"))({
  web: require("http").createServer(Gun.serve(__dirname)).listen(8765),
});

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.webContents.openDevTools()
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
