'use strict';

let koa = require('koa');
let koaStatic = require('koa-static');

let app = koa();


module.exports = function(config) {

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
    app.use(function * () {
      this.status = 404;
      this.body = '找不到该文件';
    });
  }
}
