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
    { title: 'Have a Drink!', image: 'img/solo.png', details:'' },
    { title: 'Finish Your Drink!', image: 'img/solo.png', details:'' },
    { title: 'Make a sex noise!', image: 'img/sexnoise.jpg', details:'' },
    { title: 'Take a shot!', image: 'img/shot.png', details:'' },
    { title: 'Rhyme Time!', image: 'img/solo.png', },//details:'You say a word and the person to your right has to say a word that rhymes. This goes around until someone can\'t think of a word. This person must drink. The same word can not be used twice.' },
    { title: 'Mate!', image: 'img/twoshot.png', details:'You and whoever you want drink!(pick one)' },
    { title: 'Alcoholics!', image: 'img/cheers.jpg', details:'Everybody Drinks' },
    { title: 'Take Two Shots!', image: 'img/twoshot.png', details:'' },
    { title: 'Give Wet Willy!', image: 'img/ear.png', details:'' },
    { title: 'Get Wet Willy!', image: 'img/ear.png', details:'' },
    { title: 'Moose!', image: 'img/moose.jpg', },//details:'Whoever gets this card must immediately put their thumbs to their head with his/her fingers splayed, resembling moose antlers. The last person to do this must drink.' },
    { title: 'Girls Drink!', image: 'img/female.png', details:'' },
    { title: 'Guys Drink!', image: 'img/male.png', details:'' }
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
