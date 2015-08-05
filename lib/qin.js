'use strict';

let koa = require('koa');
let koaStatic = require('koa-static');
let directory = require('koa-serve-index');
let router = require('koa-router')();
let bodyParser = require('koa-body-parser');
//
let mockRouter = require('./mock');

let app = koa();


module.exports = function(config) {

  app.use(bodyParser());
  //
  // mock post/get请求
  router.all('*', mockRouter);
  //
  app
  .use(router.routes());
  // .use(router.allowedMethods());

  //显示文件夹
  app.use(directory(config.projectPath, {
    'icons': false
  }));

  // 默认加载当前路径为static
  app.use(koaStatic(config.projectPath));

  // 加载404处理逻辑，当proxy关闭时添加
  switchDefaultNotFound(app, config);

  return app;
};

function switchDefaultNotFound(app, config) {
  if (config.proxy) {
    return;
  } else {
    app.use(function*() {
      this.status = 404;
      this.body = '找不到该文件';
    });
  }
}
