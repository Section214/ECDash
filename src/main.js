/**
 * ECDash - A simple, streamlined desktop app for monitoring EDD and WooCommerce stats
 * Copyright (C) 2016 Section214, LLC
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * @author      Daniel J Griffiths <dgriffiths@section214.com>
 * @version     0.0.1
 */


 'use strict';

// Setup globals... the fewer the better!
global.ecdash         = {};
global.ecdash.version = '0.0.1';
global.ecdash.path    = __dirname;

// Load all the things!
const electron    = require('electron');
global.ecdash.app = electron.app;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
global.ecdash.window = null;

// Quit when all windows are closed.
global.ecdash.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        global.ecdash.app.quit();
    }
});

global.ecdash.app.on('activate', function () {
    if (global.ecdash.window === null) {
        global.ecdash.window = require(global.ecdash.path + '/lib/window.js');

        global.ecdash.window.createWindow();
    }
});

global.ecdash.app.on('ready', function() {
    global.ecdash.window = require(global.ecdash.path + '/lib/window.js');
    global.ecdash.tray   = require(global.ecdash.path + '/lib/tray.js');
    global.ecdash.menu   = require(global.ecdash.path + '/lib/menu.js');

    global.ecdash.window.createWindow();
    global.ecdash.menu.render();
    global.ecdash.tray.render();
});
