'use strict';


let os = require('os');
let path = require('path');
let fs = require('fs-extra');
let program = require('commander');
let portfinder = require('portfinder');
let cwd = process.cwd();

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

let pkg = require('../package.json');
let Qin = require('../lib/qin');
let config = require('../lib/config');
let app = Qin(config);

let defaultPort;
let openFile = ' ';


program
  .version(pkg.version)
  .command('watch <filename> [otherFiles...]', '监听文件变化，自动刷新')
  .option('-p, --port [int]', '选择服务端口', setPort)
  .option('-o, --open <filename>', '选择默认打开文件', '')
  .option('-i, --init', '生成配置文件', initConfig)
  .parse(process.argv);


//配置文件生成
function initConfig(){
  fs.copy(path.join(__dirname, '../test/fixtures/config.json'), cwd + '/config.json', function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('qin: init config.json.');
    }
  });
}


//端口号
function setPort(port) {
  defaultPort = port;
}

portfinder.getPort(function(err, port) {
  if (err) {
    return;
  }
  port = defaultPort ? defaultPort : port;
  app.listen(port,function(){
    openURL(' http://' + getIPAddress() + ':' + port + '/' + openFile);
  });
});

var openURL = function(url) {
  switch (process.platform) {
    case 'darwin':
      exec('open' + url);
      console.log(url);
      break;
    case 'win32':
      exec('start ' + url);
      break;
    default:
      spawn('xdg-open', [url]);
  }
  return;
};

var getIPAddress = function() {
  var ifaces = os.networkInterfaces();
  var ip = '';
  for (var dev in ifaces) {
    ifaces[dev].forEach(hanlderIface);
  }
  function hanlderIface(details) {
    if (ip === '' && details.family === 'IPv4' && !details.internal) {
      ip = details.address;
      return;
    }
  }
  return ip || '127.0.0.1';
};
