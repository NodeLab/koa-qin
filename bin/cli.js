'use strict';

let program = require('commander');

let pkg = require('../package.json');
let server = require('../lib/server');

let defaultPort;

program
  .version(pkg.version)
  .option('-p, --port [int]', '选择服务端口', setPort);

program.parse(process.argv);

//指定端口号
function setPort(port) {
  defaultPort = port;
}

server(defaultPort);
