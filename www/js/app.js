var deckManager = angular.module('deckManager', ['ionic']);

// console.log(deckManager);

/* FACTORIES */

deckManager.factory('Decks', function() {
  var decks = [];

  return decks;
});

deckManager.factory('Deck', function() {
  var deck = {};

  deck.name = '';
  deck.cards = [];

  return deck;
});

/* CONTROLLERS */

deckManager.controller('deckListController', function($scope, $ionicSideMenuDelegate, Decks) {
  // $scope.decks = Decks.list();

  $scope.decks = Decks;

  $scope.createDeck = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.selectDeck = function(deck) {

  };
});
//
deckManager.controller('deckController', function($scope, $ionicSideMenuDelegate) {

  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.addDeck = function() {

  };
});
