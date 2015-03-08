'use strict';

angular.module('iamdbApp')
  .controller('PlayGameCtrl', PlayGameCtrl);

function PlayGameCtrl(
  $location,
  $scope,
  $stateParams,
  $sessionStorage,
  $q,
  toastr,
  socket,
  Search,
  Play,
  Turn,
  Auth
){
  var internal = {};
  var currentUser = $scope.currentUser = Auth.getCurrentUser();

  Play.fetchGame($stateParams.id)
    .then(onGameFetchSuccess, onGameFetchError)
  ;

  function onGameFetchSuccess (game) {
    $scope.game = game;
    socket.joinRoom(game, currentUser)
      .then(syncGameUpdates)
    ;
  }

  function onGameFetchError (err) {
    handleError(err);
  }

  var ioEvents = {
    'game:joined': onPlayerJoin,
    'game:left': onPlayerLeave
  }

  function onPlayerJoin (player) {
    console.log('player joined', player);
    util.pushWhere($scope.game.players, player, {_id: player._id});
  }

  function onPlayerLeave (player) {
    console.log('player left', player);
    util.pullWhere($scope.game.players, {_id: player._id});
  }

  function syncGameUpdates () {
    socket.syncUpdates('game', onGameUpdate);
  }

  function onGameUpdate (updated) {
    $scope.game = updated;
    toastr.info('Game Update: ', JSON.stringify(updated));
  }

  $scope.baseImageUrl = $sessionStorage.baseImageUrl;
  if (!$scope.baseImageUrl) {
    Search.configuration().$promise.then(function (conf) {
      if (!conf || !conf.images) return;
      $scope.baseImageUrl =
        $sessionStorage.baseImageUrl =
        conf.images.base_url + 'w500';
    }, handleError);
  }

  $scope.$on('$destroy', function () {
    socket.deregisterIO(ioEvents);
    Turn.unsyncUpdates();
    if (!$scope.game) return;
    socket.leaveRoom({game: $scope.game, player: currentUser});
  });

  function handleError (err) {
    console.log('handle error', err);
    if (err.status === 404) $location.path('play');
  }
}
