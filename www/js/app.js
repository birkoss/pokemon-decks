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

  decks.getDeck = function(index) {
    if( index < decks.decks.length ) {
      return decks.decks[ index ];
    }
    return null;
  };

  decks.getCurrentDeck = function() {
    return decks.getDeck(decks.currentDeck);
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

deckManager.controller('deckListController', function($scope, $ionicSideMenuDelegate, $ionicListDelegate, $ionicModal, Decks) {

  // Load and create the modal
  $ionicModal.fromTemplateUrl('deck-editor.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.decksList = Decks;

  $scope.listMenu = $ionicListDelegate;

  $scope.createDeck = function() {
    $scope.deck = {name: ''};
    $scope.editingDeckIndex = -1;
    $scope.modal.show();
  };

  $scope.closeModal = function () {
    $scope.listMenu.closeOptionButtons();
    $scope.modal.hide();
  };

  $scope.submitModal = function(deck) {
    if( !deck ) {
      return;
    }

    if( $scope.editingDeckIndex == -1 ) {
      deck.cards = [];
      $scope.decksList.add( deck );
    } else {
      $scope.decksList.getDeck( $scope.editingDeckIndex ).name = deck.name;
    }

    $scope.listMenu.closeOptionButtons();

    $scope.decksList.save();
    $scope.modal.hide();
  };

  $scope.renameDeck = function(index) {
    $scope.editingDeckIndex = index;
    $scope.deck = {name: $scope.decksList.getDeck(index).name};

    $scope.modal.show();
  };

  $scope.deleteDeck = function(index) {

  };

  $scope.selectDeck = function(index) {
    $scope.decksList.select(index);
    $scope.decksList.save();
    $ionicSideMenuDelegate.toggleLeft();
  };
});
//
deckManager.controller('deckController', function($scope, $ionicSideMenuDelegate, $ionicListDelegate, Decks) {

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

  // Watch for the side menu to be closed
  $scope.$watch(function() {
    return $ionicSideMenuDelegate.isOpenLeft();
  }, function(isOpen) {
    if( !isOpen ) {
      $ionicListDelegate.closeOptionButtons();
    }
  });
});
