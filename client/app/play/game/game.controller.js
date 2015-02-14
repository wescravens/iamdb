'use strict';

function PlayGameCtrl(
  $scope,
  $stateParams,
  $location,
  $http, // temporary
  socket,
  Play,
  Auth
){
  $scope.currentUser = Auth.getCurrentUser();
  $scope.game = {};

  Play.fetchGame($stateParams.id, function (err, game) {
    if (err) return handleError(err);
    $scope.game = game;
    socket.syncUpdates('game', $scope.game);
    socket.joinRoom(game.name);
  });

  // TODO: refactor this
  $http.get('/api/games/configuration')
    .success(function (data) {
      data = JSON.parse(data);
      $scope.baseImageUrl = data.images.base_url + 'w500';
      console.log('base url', $scope.baseImageUrl);
    })
    .error(function (data, error) {
      console.log('$http error: ', data, error);
    })
  ;

  $scope.joinGame = function (game) {
    Play.joinGame(game);
  };

  $scope.playerIsHost = function (player) {
    return !!_.find($scope.game.players, {_id: player._id});
  };

  $scope.currentUserIsPlayer = function () {
    return !!_.find($scope.game.players, {_id: $scope.currentUser._id});
  };

  // TODO: remove this
  $scope.testValidation = function (id) {
    var turn = {
      player: $scope.currentUser._id,
      subject: 17051, // james franco
      isActor: true,
      input: id
    };

    $http({
      url: '/api/games/' + $scope.game.name + '/validate',
      method: 'GET',
      params: turn
    })
      .success(function (data) {
        console.log('vaidation: ', data);
      })
      .error(function (data, status) {
        console.log('validation error: ', data, status);
      })
    ;
  };

  // TODO: remove this
  $scope.searchTMDB = function () {
    console.log('controller', $scope.searchController);
    $http.get('/api/search/' + $scope.searchController, {params: {query: $scope.query}})
      .success(function (data) {
        data = JSON.parse(data);
        if (!data.results || !data.results.length) return;
        $scope.results = data.results;
      })
      .error(function (data, status) {
        console.log('error', data, status);
      })
    ;
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('game');
  });

  function handleError (err) {
    console.log('handle error', err);
  }
}

angular.module('iamdbApp')
  .controller('PlayGameCtrl', PlayGameCtrl);
