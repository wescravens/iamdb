'use strict';

angular.module('iamdbApp')
  .controller('MainCtrl', Main);

function Main(Auth, Play, Turn, socket){
  // var vm = this;
  // vm.currentUser = Auth.getCurrentUser();

  // Play.fetchGame('main')
  //   .then(onGameFetchSuccess, onGameFetchError)
  // ;

  // function onGameFetchSuccess (game) {
  //   vm.game = game;
  // }

  // function onGameFetchError (err) {
  //   handleError(err);
  // }



  function handleError (err) {
    console.log('Error: ', err);
  }
}
