var request = require('supertest');

describe('loading express', function() {
  var server;
  beforeEach(function() {
    server = require('./app');
  });
  afterEach(function(done) {
    done();
  });
  it('responds to /', function testHome(done) {
    request(server).
      get('/').
      expect(200, done);
  });
  it('responds to /pwa/', function testPWA(done) {
    request(server).
      get('/pwa/').
      expect(200, done);
  });
  it('404 everything else', function test404(done) {
    request(server).
      get('/foo/').
      expect(404, done);
  });
});
