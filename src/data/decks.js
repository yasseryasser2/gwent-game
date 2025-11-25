export function createDeck(cardDefinitions) {
  const deck = [];

  cardDefinitions.forEach((card) => {
    const copiesToAdd = card.hero ? 1 : card.count;

    for (let i = 0; i < copiesToAdd; i++) {
      const cardInstance = {
        ...card,
        instanceId: `${card.id}_${i}_${Date.now()}_${Math.random()}`,
      };
      deck.push(cardInstance);
    }
  });

  return deck;
}

export function shuffleDeck(deck) {
  let deckClone = [...deck];

  for (let i = deckClone.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckClone[i], deckClone[j]] = [deckClone[j], deckClone[i]];
  }
  return deckClone;
}

function drawStartingHand(deck) {
  const hand = deck.slice(0, 10);
  const remainingDeck = deck.slice(10);

  return { hand, remainingDeck };
}

function drawCards(deck, count) {}

function validateDeck() {}
