/**
 * Window handler
 *
 * @author      Daniel J Griffiths <dgriffiths@section214.com>
 * @since       0.0.1
 */


'use strict';

const electron      = require('electron');
const BrowserWindow = electron.BrowserWindow;


/**
 * Tray class
 *
 * @since       0.0.1
 */
class window {

    /**
     * Create the application window
     *
     * @since       0.0.1
     * @return      {void}
     */
    createWindow() {
        // Load the index file into a new window
        global.ecdash.window.main = new BrowserWindow({
            width:       800,
            height:      600,
            title:       'ECDash',
            icon:        global.ecdash.path + '/assets/img/icon.png',
            skipTaskbar: true
        });
        global.ecdash.window.main.loadURL('file://' + global.ecdash.path + '/index.html');

        // Dereference the window object on close
        global.ecdash.window.main.on('closed', function() {
            global.ecdash.window.main = null;
        });

        // Minimize to tray
        global.ecdash.window.main.on('minimize', function() {
            global.ecdash.app.dock.hide();
        });

        // Restore from tray
        global.ecdash.window.main.on('restore', function() {
            global.ecdash.app.dock.show();
        });
    }
}

module.exports = new window();
