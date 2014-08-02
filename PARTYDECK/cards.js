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
    { title: 'Have a Drink!', image: 'img/solo.png', details:'Just a sip!' },
    { title: 'Finish Your Drink!', image: 'img/solo.png', details:'CHUG!' },
    { title: 'Nerd Alert!', image: 'img/glasses.png', details:'If you have glasses, Drink!' },
    { title: 'Twisted!', image: 'img/reverse.png', details:'Reverse Order of Play!' },
    { title: 'Make a sex noise!', image: 'img/sexnoise.jpg', details:'Last person Drinks!' },
    { title: 'Raise Your Hand!', image: 'img/hands.png', details:'Last person Drinks!' },
    { title: 'Take a shot!', image: 'img/shot.png', details:'lil\' Jon approves!' },
    { title: 'Rhyme Time!', image: 'img/solo.png', details:''},//details:'You say a word and the person to your right has to say a word that rhymes. This goes around until someone can\'t think of a word. This person must drink. The same word can not be used twice.' },
    { title: 'Mate!', image: 'img/twoshot.png', details:'You and one other person must Drink!' },
    { title: 'Alcoholics!', image: 'img/cheers.jpg', details:'Everybody Drinks!' },
    { title: 'Take Two Shots!', image: 'img/twoshot.png', details:'' },
    { title: 'Give a Wet Willy!', image: 'img/ear.png', details:'Muhahaha!' },
    { title: 'Get a Wet Willy!', image: 'img/ear.png', details:'This is gonna suck!' },
    { title: 'Moose!', image: 'img/moose.png', details:'Last person Drinks!'},//details:'Whoever gets this card must immediately put their thumbs to their head with his/her fingers splayed, resembling moose antlers. The last person to do this must drink.' },
    { title: 'Girls Drink!', image: 'img/female.png', details:'' },
    { title: 'Guys Drink!', image: 'img/male.png', details:'' }
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  // $scope.cardSwiped = function(index) {
  //   $scope.addCard();
  // };

  $scope.cardSwiped = function(index){
      $scope.cards.length = 0;//Removes Excess Cards
      $scope.addCard();
  }

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  var cardIndexHistory = [];

  $scope.addCard = function() {
    var index = Math.floor(Math.random() * cardTypes.length)
    cardIndexHistory.push(index);

    //Prevent Repeats
    if(cardIndexHistory.length > 2){
      var stop = cardIndexHistory -2;
      var shortHistory=[];

      for(var k = cardIndexHistory.length; k > stop; k-- ){
        shortHistory.push(cardIndexHistory[k]);
      }

      if(cardIndexHistory[0]==cardIndexHistory[1]){
      //Reset index
      index = Math.floor(Math.random() * cardTypes.length)
      //If it continues to persist
        while(index == cardIndexHistory[0]){
          index = Math.floor(Math.random() * cardTypes.length)
        }
      }
    }

    //To much, dump memory
    if(cardIndexHistory.length > 40){
      cardIndexHistory.length = 0;
    }

    var newCard = cardTypes[index];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

  // $scope.addCard = function() {
  //   var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
  //   newCard.id = Math.random();
  //   $scope.cards.push(angular.extend({}, newCard));
  // }
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
