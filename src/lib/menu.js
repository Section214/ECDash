/**
 * Menu handler
 *
 * @author      Daniel J Griffiths <dgriffiths@section214.com>
 * @since       0.0.1
 */


'use strict';

const electron        = require('electron');
const Menu            = electron.Menu;
const openAboutWindow = require('about-window').default;

class menu {
    render() {
        let template = [
            {
                label:   'Window',
                role:    'window',
                submenu: [
                    {
                        label:       'Minimize',
                        accelerator: 'CmdOrCtrl+M',
                        role:        'minimize'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label:       'Toggle Developer Tools',
                        accelerator: (function() {
                            if (process.platform === 'darwin') {
                                return 'Alt+Command+I';
                            } else {
                                return 'Ctrl+Shift+I';
                            }
                        })(),
                        click: function(item, focusedWindow) {
                            if (focusedWindow) {
                                focusedWindow.webContents.toggleDevTools();
                            }
                        }
                    }
                ]
            },
            {
                label:   'Help',
                role:    'help',
                submenu: [
                    {
                        label: 'Documentation',
                        click: function() { electron.shell.openExternal('https://ecdash.com'); }
                    }
                ]
            }
        ];

        if (process.platform === 'darwin') {
            let name = global.ecdash.app.getName();

            template.unshift({
                label: name,
                submenu: [
                    {
                        label: 'About ' + name,
                        click: () => openAboutWindow({
                            icon_path:      global.ecdash.path + '/assets/img/branding.png',
                            copyright:      'Copyright © 2016 Section214, LLC',
                            homepage:       'https://ecdash.com',
                            bug_report_url: 'https://ecdash.com/support'
                        })
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label:   'Services',
                        role:    'services',
                        submenu: []
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label:       'Hide ' + name,
                        accelerator: 'Command+H',
                        role:        'hide'
                    },
                    {
                        label:       'Hide Others',
                        accelerator: 'Command+Alt+H',
                        role:        'hideothers'
                    },
                    {
                        label: 'Show All',
                        role:  'unhide'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label:       'Quit',
                        accelerator: 'Command+Q',
                        click:       function() { global.ecdash.app.quit(); }
                    }
                ]
            });

            template[1].submenu.push(
                {
                    type: 'separator'
                },
                {
                    label: 'Bring All to Front',
                    role:  'front'
                }
            );
        }

        let menu = Menu.buildFromTemplate(template);

        Menu.setApplicationMenu(menu);
    }
}

module.exports = new menu();
