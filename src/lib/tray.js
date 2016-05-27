/**
 * Tray handler
 *
 * @author      Daniel J Griffiths <dgriffiths@section214.com>
 * @since       0.0.1
 */


'use strict';

const electron        = require('electron');
const openAboutWindow = require('about-window').default;
const Menu            = electron.Menu;
const Tray            = electron.Tray;


/**
 * Tray class
 *
 * @since       0.0.1
 */
class tray {
    render() {
        let appIcon     = null;
        let appIconMenu = null;

        // Determine appropriate icon
        if (process.platform !== 'win32') {
            appIcon = new Tray(global.ecdash.path + '/assets/img/iconTemplate.png');
            appIcon.setPressedImage(global.ecdash.path + '/assets/img/iconHighlight.png');
        } else {
            appIcon = new Tray(global.ecdash.path + '/assets/img/tray.ico');
        }

        appIconMenu = Menu.buildFromTemplate([
            {
                label: 'Show ' + global.ecdash.app.getName(),
                type:  'normal',
                click: function() { global.ecdash.window.restore(); }
            },
            {
                type: 'separator'
            },
            {
                label: 'About',
                type:  'normal',
                click: () => openAboutWindow({
                    icon_path:      global.ecdash.path + '/assets/img/icon.png',
                    copyright:      'Copyright © 2016 Section214, LLC',
                    homepage:       'https://ecdash.com',
                    bug_report_url: 'https://ecdash.com/support'
                })
            },
            {
                type: 'separator'
            },
            {
                label:       'Quit',
                type:        'normal',
                accelerator: 'Command+Q',
                click:       function() { global.ecdash.app.quit(); }
            }
        ]);

        appIcon.setContextMenu(appIconMenu);
    }
}

module.exports = new tray();
