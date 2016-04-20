var deckManager = angular.module('deckManager', ['ionic']);

// console.log(deckManager);

/* FACTORIES */

deckManager.factory('Decks', function() {
  var decks = {};

  decks.decks = [];
  decks.currentDeck = -1;

  decks.select = function(index) {
    if( index < decks.decks.length ) {
      decks.currentDeck = index;
    }
  };

  decks.add = function(deck) {
    decks.decks.push(deck);
  };

  decks.save = function() {
    window.localStorage['decks'] = angular.toJson(decks.decks);
    window.localStorage['currentDeck'] = decks.currentDeck;
  };

  decks.getCurrentDeck = function() {
    if( decks.currentDeck < decks.decks.length ) {
      return decks.decks[ decks.currentDeck ];
    }
    return null;
  };

  var savedDecks = window.localStorage['decks'];
  if( savedDecks ) {
    decks.decks = angular.fromJson( savedDecks );
  }

  var currentDeck = window.localStorage['currentDeck'];
  if( currentDeck ) {
    console.log('CD: ' + currentDeck);
    decks.select(currentDeck);
  }

  return decks;
});

/* CONTROLLERS */

deckManager.controller('deckListController', function($scope, $ionicSideMenuDelegate, $ionicModal, Decks) {

  // Load and create the modal
  $ionicModal.fromTemplateUrl('deck-editor.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.decksList = Decks;

  $scope.createDeck = function() {
    $scope.modal.show();
    //$ionicSideMenuDelegate.toggleLeft();
  };

  $scope.selectDeck = function(index) {
    $scope.decksList.select(index);
    $scope.decksList.save();
    $ionicSideMenuDelegate.toggleLeft();
  };
});
//
deckManager.controller('deckController', function($scope, $ionicSideMenuDelegate, Decks) {

  $scope.decksList = Decks;
  $scope.deck = $scope.decksList.getCurrentDeck();

  $scope.toggleMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.addCard = function() {

  };

  // Watch for a deck change
  $scope.$watch('decksList.currentDeck', function(newValue, oldValue, scope) {
    if( newValue != oldValue ) {
      $scope.deck = $scope.decksList.getCurrentDeck();
    }
  });
});
