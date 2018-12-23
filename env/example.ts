/// <reference path="../typings/carlo.d.ts" />
import carlo = require('carlo');

(async function() {
    // Launch the browser
    const app = await carlo.launch();

    // Terminate Nodejs process on app window closing
    app.on('exit', () => process.exit());

    // Tell carlo where your web files are located
    app.serveFolder(__dirname);

    // Expose 'env' function in the web environment
    await app.exposeFunction('env', (_: never) => process.env);

    // Navigate to the main page of your app
    await app.load('example.html');
})();
