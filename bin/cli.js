'use strict';

let program = require('commander');
let portfinder = require('portfinder');

let pkg = require('../package.json');
let Qin = require('../lib/qin');
let config = require('../lib/config');
let app = Qin(config);

let defaultPort;


program
  .version(pkg.version)
  .command('watch <filename> [otherFiles...]', '监听文件变化，自动刷新')
  .option('-p, --port [int]', '选择服务端口', setPort)
  .option('-o, --open <filename>', '选择默认打开文件', '')
  .option('-i, --init', '生成配置文件', '')
  .parse(process.argv);

function setPort(port) {
  // body...
  defaultPort = port;
}

portfinder.getPort(function(err, port) {
  if (err) {
    return;
  }
  port = defaultPort ? defaultPort : port;
  console.log('port', port);
  app.listen(port);
});
