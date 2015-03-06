'use strict';

angular.module('iamdbApp')
  .directive('gameChat', gameChat);

function gameChat () {
  return {
    restrict: 'E',
    templateUrl: 'components/chat/chat.html',
    controller: function ($scope, chat) {
      var watcher = $scope.$watch('game', function (game) {
        if (!game) return;
        $scope.game.log = $scope.game.log || [];
        chat.listen($scope.game.log);
        watcher();
      });
      $scope.sendChat = function () {
        $scope.game.log.push(chat.send($scope.gameChatInput));
        $scope.gameChatInput = '';
      };
    }
  };
}
