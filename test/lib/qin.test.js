'use strict';

let Qin = require('../../lib/qin');
let config = require('../fixtures/config');

let request = require('supertest');
let should = require('should');
// let cheerio = require('cheerio');

let app = Qin(config);

describe('lib/qin.js', function() {

  before(function*() {
    app.listen(config.port);
  });

  it('should handle request', function*(done) {
    request(app.callback())
      .get('/package.json')
      .expect(200, done);
  });

  it('should report Not Match', function*(done) {
    request(app.callback())
      .get('/path_should_not_match' + new Date())
      .expect(404)
      .end(function(err, res) {
        should.not.exists(err);
        res.text.should.eql('找不到该文件');
        done();
      });
  });

  it('should handle serve index', function*(done) {
    request(app.callback())
      .get('/')
      .expect(200, done);
  });

  //test GET
  it('should response the get request in config.json', function*(done) {
    request(app.callback())
      .get('/query?name=qinjs')
      .expect(200)
      .end(function(err, res) {
        should.not.exists(err);
        res.text.should.eql('{"code":200}');
        done();
      });
  });

  it('should reject the get request in config.json', function*(done) {
    request(app.callback())
      .get('/query')
      .expect(200)
      .end(function(err, res) {
        should.not.exists(err);
        res.text.should.eql('{"code":500}');
        done();
      });
  });

  //test POST
  it('should response the post request in  config.json', function*(done) {
    request(app.callback())
      .post('/post')
      .send({ groupId: '189'})
      .expect(200)
      .end(function(err, res) {
        should.not.exists(err);
        res.text.should.eql('{"code":200}');
        done();
      });
  });

  it('should reject the post request in  config.json', function*(done) {
    request(app.callback())
      .post('/post')
      .expect(200)
      .end(function(err, res) {
        should.not.exists(err);
        res.text.should.eql('{"code":500}');
        done();
      });
  });

  //test ftl
  it('should handle and render freemarker file', function*(done) {
    request(app.callback())
      .get('/test/fixtures/test.ftl')
      .expect(200)
      .end(function(err, res) {
        should.not.exists(err);
        res.text.should.eql('qinqinqin\n');
        done();
      });
  });


});
