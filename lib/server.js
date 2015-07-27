/**
 * 起静态服务
 */

 'use strict';

let portfinder = require('portfinder');

let Qin = require('../lib/qin');
let config = require('../lib/config');
let app = Qin(config);

module.exports = function(defaultPort){
  portfinder.getPort(function(err, port) {
    if (err) {
      console.error(err);
    }
    port = defaultPort || port;
    console.log('Server address: http://127.0.0.1:' + port + '/');
    console.log('Server running... press ctrl-c to stop.');
    app.listen(port);
  });
};
