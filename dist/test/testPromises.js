// Generated by CoffeeScript 1.9.3
(function() {
  var IPC, assert;

  assert = require('chai').assert;

  IPC = require('../process-comm');

  describe('Deferred spawn requests', function() {
    var worker;
    worker = null;
    beforeEach(function() {
      return worker = IPC.spawn('node', ['dist/test/workers/promiser.js']);
    });
    afterEach(function() {
      return worker != null ? worker.free() : void 0;
    });
    it('can be resolved', function(done) {
      return worker.promise('resolving-request').then(function() {
        return done();
      })["catch"](function() {
        return done('Should have been resolved');
      });
    });
    it('can be rejected', function(done) {
      return worker.promise('rejecting-request').then(function() {
        return done('Should have been rejected');
      })["catch"](function() {
        return done();
      });
    });
    it('can receive progress notifications', function(done) {
      var count;
      count = 0;
      return worker.promise('notifying-request').then(function() {
        assert.equal(count, 3, 'Expected 3 notifications before resolution');
        return done();
      })["catch"](function() {
        return done('error');
      }).notify(function(data) {
        return count++;
      });
    });
    it('will reject unregistered deferred requests', function(done) {
      return worker.promise('unregistered-request').then(function() {
        return done('Should have been rejected');
      })["catch"](function() {
        return done();
      });
    });
    return it('will reject promises if the spawn closes', function(done) {
      return worker.promise('early-stop').then(function() {
        return done('Should have been rejected');
      })["catch"](function() {
        return done();
      });
    });
  });

}).call(this);
