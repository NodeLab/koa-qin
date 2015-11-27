'use strict';
const path = require('path').join;
const deepEqual = require('deep-equal');

let config = require(path(process.cwd(), './config.json'));

module.exports = function *(next){

  // mock entry
  let r = config.ajaxList[this.request.path];

  // 如果不存在对应 entry 执行下一个
  if (!r) {
    yield next;
    return;
  }

  // 默认为 get 请求
  r.type = r.type || 'get';

  this.type = 'application/json; charset=utf-8';

  // mock GET
  if (this.request.method === 'GET') {

    if (r.type.toLowerCase() !== 'get') {
      return yield next;
    }

    // 没有 result 字段直接返回
    if (!('result' in r)) {
      return this.body = r;
    }

    if (deepEqual(r.query, this.query)) {
      return this.body = r.result || '请填写result';
    } else {
      return this.body = r.reject || '请填写reject';
    }
  }

  //mock POST
  if (this.request.method === 'POST') {

    if (r.type.toLowerCase() !== 'post') {
      return yield next;
    }

    if (deepEqual(r.body, this.request.body)) {
      return this.body = r.result || '请填写result';
    } else {
      return this.body = r.reject || '请填写reject';
    }

  }

  return yield next;
};
