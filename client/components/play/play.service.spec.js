'use strict';

describe('Service: play', function () {

  // load the service's module
  beforeEach(module('iamdbApp'));

  // instantiate service
  var play;
  beforeEach(inject(function (_play_) {
    play = _play_;
  }));

  it('should return an object', function () {
    expect(!!play).toBe(true);
  });

});
