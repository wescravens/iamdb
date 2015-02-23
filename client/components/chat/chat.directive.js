'use strict';

angular.module('iamdbApp')
  .directive('gameChat', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/chat/chat.html',
      controller: function ($scope, chat) {
        $scope.chats = [];
        chat.listen($scope.chats);
        $scope.sendChat = function () {
          console.log('send chat');
          chat.send($scope.gameChatInput);
        };
      }
    };
  })
;
