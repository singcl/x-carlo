'use strict';

const os = require('os');
const path = require('path');
const si = require('systeminformation');
const carlo = require('carlo');

async function run() {
    let app;
    try {
        app = await carlo.launch({
            bgcolor: '#2b2e3b',
            title: 'SystemInformation App',
            width: 1000,
            height: 500,
            channel: ['canary', 'stable'],
            icon: path.join(__dirname, '/app_icon.png'),
            args:
                process.env.DEV === 'true'
                    ? ['--auto-open-devtools-for-tabs']
                    : [],
            localDataDir: path.join(os.homedir(), '.carlosyteminfo')
        });
    } catch (e) {
        // New window is opened in the running instance.
        console.log('Reusing the running instance');
        return;
    }

    app.on('exit', () => process.exit());
    // New windows are opened when this app is started again from command line.
    app.on('window', window => window.load('index.html'));
    app.serveFolder(path.join(__dirname, 'www'));
    await app.exposeFunction('systeminfo', systeminfo);
    await app.load('index.html');
    return app;
}

async function systeminfo() {
    const info = {};
    await Promise.all([
        si.battery().then(r => info.battry = r),
        si.cpu().then(r => info.cpu = r),
        si.osInfo().then(r => info.osInfo = r)
    ]);
    return info;
}

module.exports = { run };