const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");
// console.log("NODE_ENV:", process.env.NODE_ENV);

const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV !== "development";

// Create the main window
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        width: isDev ? 1000 : 500,
        height: 600,
    });

    // mainWindow.setMenu(menu);

    // Open devtools if in dev environment
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

// app.on('ready', () => {
//     createMainWindow();
// });

// App is ready
app.whenReady().then(() => {
    createMainWindow();

    // Implement menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);



    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

// Menu template
const menu=[
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: 'About',
            }
        ]
    }]:[]),
    {
        // label: 'File',
        // submenu: [
        //     {
        //         label: 'Quit',
        //         click: () => {
        //             app.quit();
        //         }, 
        //         accelerator: 'CmdOrCtrl+W',
        //     }
        // ]

        role: 'fileMenu',
    }
]

app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});
