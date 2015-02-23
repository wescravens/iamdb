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
  var intern = {};
  var sock = socket.socket;

  var currentUser = $scope.currentUser = Auth.getCurrentUser();

  Play.fetchGame($stateParams.id, function (err, game) {
    if (err) return handleError(err);
    $scope.game = game;
    sock.emit('game:join', {game: game, player: currentUser}, function () {
      socket.syncUpdates('game', function (updated) {
        $scope.game = updated;
      });
    });
  });

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
    socket.unsyncUpdates('game');
    Turn.unsyncUpdates();
  });

  $scope.joinGame = function (game) {
    Play.joinGame(game);
  };

  $scope.yourTurn = function () {

  };

  $scope.startTurn = function (id) {
    $scope.turn = {
      player: $scope.currentUser._id,
      subject: 17051, // TEST: james franco
      isActor: true,
      input: id,
      game: $scope.game
    };
    Turn.start($scope.turn);
    startTimer().then(handleTurnResult);
  };

  $scope.answerTurn = function (input) {
    intern.__dfd.resolve('answered');
    $scope.turn.input = input;
    Turn.answer($scope.turn);
  };

  $scope.challengeTurn = function () {
    intern.__dfd.resolve('challenged');
    Turn.challenge($scope.turn);
  };

  function startTimer () {
    intern.__dfd = $q.defer();
    var timeLimit = $scope.timeLeft = 30 * 1000;
    intern.__timerInterval = setInterval(function () {
      $scope.timeLeft--;
    }, 1000);
    setTimeout(function () {
      clearInterval(intern.__timerInterval);
      intern.__dfd.resolve('timeout');
    }, timeLimit);
  }

  function handleTurnResult (result) {
    console.log('turn result', result, $scope.turn);
  }

  function handleError (err) {
    console.log('handle error', err);
    if (err.status === 404) $location.path('play');
  }
}
