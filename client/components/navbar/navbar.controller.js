'use strict';

angular.module('iamdbApp')
  .controller('NavbarCtrl', function ($scope, $location, $state, Auth) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/'
      },{
        'title': 'Play',
        'link': '/play'
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return $state.includes(route.substr(1));
    };
  });
