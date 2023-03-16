let http = require('http');

let reqmessage = require('./routes');

const server = http.createServer(reqmessage)

server.listen(4000);