angular.module('starter', ['ionic', 'ionic.contrib.ui.cards'])

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate) {
  var cardTypes = [
    { title: 'Have a Drink!', image: 'solo.jpg' },
    { title: 'Take a shot!', image: 'shot.jpg' },
    { title: 'Everybody Drinks!', image: 'cheers.jpg' },
    { title: 'Take Two Shots!', image: 'twoshot.jpg' },
    { title: 'Wet Willy!', image: 'ear.jpg' }
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
});

//Prevent right click
function catch_click(e)
{
    if (!e) var e = window.event;

    var right_click = (e.which ? (e.which == 3) : (e.button == 2));

    if (right_click)
    {
        return false;
    }
}

document.onmousedown = catch_click;
if (document.captureEvents) document.captureEvents(Event.MOUSEDOWN);
