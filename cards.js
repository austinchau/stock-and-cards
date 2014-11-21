function Game(cardsPerHand) {
  this.deck = new Deck();
  this.hands = [];
  this.cardsPerHand = cardsPerHand;
};

Game.prototype.clear = function() {
  this.deck = new Deck();
  this.hands = [];
};

Game.prototype.dealCards = function(numOfPlayers) {
  for (var i=0; i<numOfPlayers; i++) {
    var cards = this.deck.dealCards(this.cardsPerHand, true);
    var hand = new Hand(cards);
    this.hands.push(hand);
  }
};

function Deck() {
  this.cards = []

  // initialize cards value and suit
  for (var i=0; i < 4; i++) {    
    for (var j=0; j< 10;j++) {
      var card = new Card();
      card.suit = i;
      card.value = j;
      card.isFace = false;
      this.cards.push(card);
    }
    for (var k=10; k< 13;k++) {
      var card = new Card();
      card.suit = i;
      card.value = k;
      card.isFace = true;
      this.cards.push(card);
    }
  }
  
  this.shuffle();
}

Deck.prototype.cardsAvailable = function() {
  return this.cards.length;
};

Deck.prototype.shuffle = function() {
  var newDeck = [];
  while (this.cards.length > 0) {
    var index = Math.floor(Math.random() * this.cards.length); 
    newDeck.push(this.cards.splice(index, 1)[0]);
  }
  this.cards = newDeck;
};

Deck.prototype.dealCards = function(x, random) {
  // random: true, draw randomly from deck; false, draw at the top;
  if (!random) {
    return this.cards.splice(0, x);
  } else {
    var cards = [];
    while (x > 0) {
      var index = Math.floor(Math.random() * this.cards.length);
      cards.push(this.cards.splice(index, 1)[0]);
      --x;
    }
    return cards;
  }  
}

function Card() {
  this.suit = null;
  this.value = -1;
  this.isFace = false;
}

Card.prototype.getValue = function() {
  return this.value;
};

function Hand(cards) {
  this.cards = cards;
}

Hand.prototype.sortBySuit = function() {
  
};

Hand.prototype.sortByValue = function() {
  
};

Hand.prototype.totalValue = function() {
  
};

var g = new Game(5);
g.dealCards(4);
console.log(JSON.stringify(g, null, 2));

// var d = new Deck();
// d.shuffle();
// console.log(d.cardsAvailable());
// console.log(d.dealCards(3, true));
// console.log(d.cardsAvailable());