const app = require ("./app.js");
const debug = require("debug")("node-angular");
const https = require("https");
const fs = require('fs');
const options = {
    // key: fs.readFileSync('key.pem'),
    // cert: fs.readFileSync('cert.pem')
    key: fs.readFileSync('/etc/letsencrypt/live/cvetochniy.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/cvetochniy.com/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/cvetochniy.com/chain.pem')
};
const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
    debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = https.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port, () => {
    console.log(`Server running on port: ${port}/`);
});


