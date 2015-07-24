'use strict';

let os = require('os');
let program = require('commander');
let portfinder = require('portfinder');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

let pkg = require('../package.json');
let Qin = require('../lib/qin');
let config = require('../lib/config');
let app = Qin(config);

let defaultPort;
let openFile = ' ';

let initConfig = require('../lib/initConfig');

program
  .version(pkg.version)
  .option('-p, --port [int]', '选择服务端口', '')
  .option('-o, --open <filename>', '选择默认打开文件', '');

//生成配置文件
program
  .command('init')
  .description('生成配置文件config.json')
  .action(initConfig);

program.parse(process.argv);



//端口号
// function setPort(port) {
//   defaultPort = port;
// }
//
// var openURL = function(url) {
//   switch (process.platform) {
//     case 'darwin':
//       exec('open' + url);
//       console.log(url);
//       break;
//     case 'win32':
//       exec('start ' + url);
//       break;
//     default:
//       spawn('xdg-open', [url]);
//   }
//   return;
// };
//
// var getIPAddress = function() {
//   var ifaces = os.networkInterfaces();
//   var ip = '';
//   for (var dev in ifaces) {
//     ifaces[dev].forEach(hanlderIface);
//   }
//   function hanlderIface(details) {
//     if (ip === '' && details.family === 'IPv4' && !details.internal) {
//       ip = details.address;
//       return;
//     }
//   }
//   return ip || '127.0.0.1';
// };
//
// portfinder.getPort(function(err, port) {
//   if (err) {
//     return;
//   }
//   port = defaultPort ? defaultPort : port;
//   app.listen(port, function(){
//     openURL(' http://' + getIPAddress() + ':' + port + '/' + openFile);
//   });
// });
