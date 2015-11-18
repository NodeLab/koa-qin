#!/usr/bin/env node
'use strict';

let program = require('commander');

let pkg = require('../package.json');
let server = require('../lib/server');
let initConfig = require('../lib/initConfig');

let defaultPort;
let run = true; //用于控制是否启动服务

program
  .version(pkg.version)
  .option('-p, --port [int]', '选择服务端口', setPort);

program
  .command('init')
  .description('初始化，生成config.json配置文件')
  .action(handleInit);

program.parse(process.argv);

// if (!program.args.length) program.help();

//初始化文件
function handleInit(){
  run = false;
  initConfig();
}

// 指定端口号
function setPort(port) {
  defaultPort = port;
}

if (run) {
    server(defaultPort);
}
