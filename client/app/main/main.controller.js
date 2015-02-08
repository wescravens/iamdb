'use strict';

function Main(
  $scope,
  $location,
  $http,
  Auth,
  Play,
  socket
){
  if (!Auth.isLoggedIn()) {
    $location.href = '/login';
  }

  $scope.currentUser = Auth.getCurrentUser();

  function createMainGame () {
    var newGame = {
      name: 'main',
      players: [$scope.currentUser._id]
    };
    Play.createGame(newGame, function (game) {
      $scope.game = game;
      socket.syncUpdates('game', $scope.game);
    });
  }

  Play.fetchGame('main', function (game) {
    console.log('init game', game);
    if (game.status && game.status === 404) {return createMainGame();}
    $scope.game = game;
    socket.syncUpdates('game', $scope.game);
  });

  $scope.myTurn = function () {
    console.log('myturn');
    $scope.game.turn = $scope.currentUser._id;
    Play.sendState($scope.game);
  };

  $scope.searchTMDB = function () {
    $http.get('/api/search/search/person', {params: {query: $scope.query || 'brad pitt'}})
      .success(function (data) {
        console.log('success', data);
      })
      .error(function (data, status) {
        console.log('error', data, status);
      })
    ;
  };

  console.log('scope', $scope);

  $scope.$watch('game', function (n, o) {
    console.log('game change', n, o);
  });
}

angular.module('iamdbApp')
  .controller('MainCtrl', Main);
