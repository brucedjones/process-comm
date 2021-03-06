// Generated by CoffeeScript 1.9.3
(function() {
  var IPC, assert;

  assert = require('chai').assert;

  IPC = require('../process-comm');

  describe('Worker spawn', function() {
    it('can be created', function() {
      var worker;
      worker = IPC.spawn('node', ['dist/test/workers/breif.js']);
      return assert.isTrue(worker.isAlive(), 'should be alive');
    });
    it('will emit a close event when done working', function(done) {
      var worker;
      worker = IPC.spawn('node', ['dist/test/workers/breif.js']);
      return worker.on('close', function() {
        assert.ok('Worker spawn finished');
        return done();
      });
    });
    it('can be destroyed', function() {
      var worker;
      worker = IPC.spawn('node', ['dist/test/workers/spin.js']);
      worker.free();
      return assert.isFalse(worker.isAlive(), 'should be destroyed');
    });
    return it('will emit a close event when destroyed', function(done) {
      var worker;
      worker = IPC.spawn('node', ['dist/test/workers/spin.js']);
      worker.on('close', function() {
        assert.ok('Destroyed worker spawn');
        return done();
      });
      return worker.free();
    });
  });

}).call(this);
