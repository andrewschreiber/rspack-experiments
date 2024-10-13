(() => { // webpackBootstrap
"use strict";
var __webpack_modules__ = ({});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

/************************************************************************/
// webpack/runtime/rspack_version
(() => {
__webpack_require__.rv = function () {
	return "1.0.8";
};

})();
// webpack/runtime/rspack_unique_id
(() => {
__webpack_require__.ruid = "bundler=rspack@1.0.8";

})();
/************************************************************************/

;// CONCATENATED MODULE: external "electron"
const external_electron_namespaceObject = require("electron");
;// CONCATENATED MODULE: ./src/main/index.ts
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
console.log('Start time', new Date().toISOString());

console.log('Post import', new Date().toISOString());
function createWindow() {
    return _createWindow.apply(this, arguments);
}
function _createWindow() {
    _createWindow = // import { electronApp, optimizer, is } from '@electron-toolkit/utils'
    // import icon from '../../resources/icon.png?asset'
    _async_to_generator(function() {
        var mainWindow, join, location, location1;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    console.log('Create window', new Date().toISOString());
                    // Create the browser window.
                    mainWindow = new external_electron_namespaceObject.BrowserWindow({
                        width: 1000,
                        height: 670,
                        autoHideMenuBar: true,
                        // ...(process.platform === 'linux' ? { icon } : {}),
                        webPreferences: {
                        }
                    });
                    console.log('Window created', new Date().toISOString());
                    console.log('Window created', new Date().toISOString());
                    mainWindow.on('ready-to-show', function() {
                        console.log('Ready to show', new Date().toISOString());
                        external_electron_namespaceObject.app.quit();
                        mainWindow.show();
                    });
                    mainWindow.webContents.setWindowOpenHandler(function(details) {
                        external_electron_namespaceObject.shell.openExternal(details.url);
                        return {
                            action: 'deny'
                        };
                    });
                    // HMR for renderer base on electron-vite cli.
                    // Load the remote URL for development or the local html file for production.
                    // import { join } from 'path'
                    mainWindow.loadURL('http://localhost:9527/renderer');
                    console.log('Loaded URL', new Date().toISOString());
                    return [
                        2
                    ];
                case 1:
                    join = _state.sent().join;
                    if (false) {} else {
                        location1 = join(__dirname, './renderer.html');
                        console.log('load local html file2', location1);
                        mainWindow.loadFile(location1);
                    }
                    return [
                        2
                    ];
            }
        });
    });
    return _createWindow.apply(this, arguments);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
external_electron_namespaceObject.app.whenReady().then(function() {
    // Set app user model id for windows
    // electronApp.setAppUserModelId('com.electron')
    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    external_electron_namespaceObject.app.on('browser-window-created', function(_, window) {
    // optimizer.watchWindowShortcuts(window)
    });
    // IPC test
    external_electron_namespaceObject.ipcMain.on('ping', function() {
        return console.log('pong');
    });
    createWindow();
    external_electron_namespaceObject.app.on('activate', function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (external_electron_namespaceObject.BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
external_electron_namespaceObject.app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        external_electron_namespaceObject.app.quit();
    }
}) // In this file you can include the rest of your app"s specific main process
 // code. You can also put them in separate files and require them here.
;

})()
;
//# sourceMappingURL=electron_main.js.map