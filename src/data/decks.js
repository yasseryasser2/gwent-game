function createDecks() {
  let cards = [];

  cards.forEach((card) => {
    if (card.hero) {
      cards.push(card.hero);
    }
    if (!card.hero) {
      cards.push(card.count);
    }
    cards.randomUUID();
  });
  return cards;
}

function shuffleDeck(deck) {
  let deckClone = [...deck];

  for (let i = deckClone.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckClone[i], deckClone[j]] = [deckClone[j], deckClone[i]];
  }
}

function drawStartingHand(deck) {}

function drawCards(deck, count) {}

function validateDeck() {}
