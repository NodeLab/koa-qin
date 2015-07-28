/**
 * 初始化,生成配置文件config.json
 */
'use strict';

let fs = require('fs-extra');
let path = require('path');
let cwd = process.cwd();

module.exports = function(){
  fs.copy(path.join(__dirname, '../config.json'), cwd + '/config.json', function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('init config.json.');
    }
  });
};
