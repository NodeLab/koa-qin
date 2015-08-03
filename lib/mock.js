'use strict';
let path = require('path').join;
// var request = require('request');

let config = require(path(__dirname, '../config.json'));

module.exports = function *(next){
  let property;
  let thisReq;
  let isEqual = true;
  this.type = 'application/json; charset=utf-8';
  let r = config.ajaxList[this.request.path];
  if (!r) {
    yield next;
    return;
  }
  //mock GET
  if (this.request.method === 'GET') {
    if (!('result' in r)) {this.body = r; }
    property = 'query';
    thisReq = this.query;
  }
  //mock POST
  if (this.request.method === 'POST') {
    if (r.type.toLowerCase() !== 'post') {
      yield next;
      return;
    }
    property = 'body';
    thisReq = this.request.body;
  }

  for (let i in r[property]){
    if (r[property][i] !== thisReq[i] && r[property][i] !== '*') {
      isEqual = false;
      break;
    }
  }

  if (isEqual) {
    this.body = r.result;
  } else {
    this.body = r.reject || '参数填写错误 请重新填写';
  }

  // yield next;
  return;
};
