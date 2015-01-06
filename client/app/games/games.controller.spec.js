'use strict';

describe('Controller: GamesCtrl', function () {

  // load the controller's module
  beforeEach(module('iamdbApp'));

  var GamesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GamesCtrl = $controller('GamesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
