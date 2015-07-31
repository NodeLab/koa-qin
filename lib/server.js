/**
 * 起静态服务
 */

 'use strict';

let os = require('os');
let portfinder = require('portfinder');
let exec = require('child_process').exec;
let spawn = require('child_process').spawn;

let Qin = require('../lib/qin');
let config = require('../lib/config');
let app = Qin(config);

var openURL = function(url) {
  switch (process.platform) {
    case 'darwin':
      exec('open' + url);
      console.log('Server address: ' + url);
      console.log('Server running... press ctrl-c to stop.');
      break;
    case 'win32':
      exec('start ' + url);
      break;
    default:
      spawn('xdg-open', [url]);
  }
  return;
};

function getIPAddress() {
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
}

module.exports = function(defaultPort){
  portfinder.getPort(function(err, port) {
    if (err) {
      console.error(err);
    }
    port = defaultPort || port;
    app.listen(port, function(){
      openURL(' http://' + getIPAddress() + ':' + port + '/');
    });
  });
};
