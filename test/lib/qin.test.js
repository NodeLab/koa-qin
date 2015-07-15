'use strict';

let Qin = require('../../lib/qin');
let config = require('../fixtures/config');

let request = require('supertest');
let should = require('should');

let app = Qin(config);

describe('lib/qin.js', function () {

  before(function * () {
    app.listen(config.port);
  });

  it('should handle request', function * (done) {
    request(app.callback())
      .get('/package.json')
      .expect(200, done);
  });

  it('should report Not Match', function * (done) {
    request(app.callback())
      .get('/path_should_not_match' + new Date())
      .expect(404)
      .end(function (err, res) {
        should.not.exists(err);
        res.text.should.eql('找不到该文件');
        done();
      });
  });

});
