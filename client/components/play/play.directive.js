'use strict';

angular.module('iamdbApp')
  .directive('play', play);

angular.module('iamdbApp')
  .controller('playViewer', playViewer);

function play () {
  return {
    restrict: 'E',
    templateUrl: 'components/play/play.html',
    controller: 'playViewer as play'
  };
}

function playViewer ($scope, Play, Turn, Auth, toastr) {
  var view = this;
  var currentUser = Auth.getCurrentUser();

  view.startGame = function () {
    if (!$scope.game) return toastr.error('Error', 'Failed to fetch game');
    // if (!$scope.game.isHost(currentUser)) {
    //   var host = $scope.game.host.name || 'the host';
    //   return toastr.error('Error', 'Only ' + host + ' can start the game.');
    // }
    Play.startGame($scope.game);
  };

  view.startTurn = function (id) {
    view.turn = {
      player: view.currentUser._id,
      subject: 17051, // TEST: james franco
      isActor: true,
      input: id,
      game: view.game
    };
    Turn.start(view.turn);
    startTimer().then(handleTurnResult);
  };

  view.answerTurn = function (input) {
    internal.__dfd.resolve('answered');
    view.turn.input = input;
    Turn.answer(view.turn);
  };

  view.challengeTurn = function () {
    internal.__dfd.resolve('challenged');
    Turn.challenge(view.turn);
  };

  function startTimer () {
    internal.__dfd = $q.defer();
    var timeLimit = view.timeLeft = 30 * 1000;
    internal.__timerInterval = setInterval(function () {
      view.timeLeft--;
    }, 1000);
    setTimeout(function () {
      clearInterval(internal.__timerInterval);
      internal.__dfd.resolve('timeout');
    }, timeLimit);
  }

  function handleTurnResult (result) {
    console.log('turn result', result, view.turn);
  }
}
