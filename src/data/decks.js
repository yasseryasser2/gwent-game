import { CARD_TYPES } from "./constants";

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
  const deckClone = [...deck];

  for (let i = deckClone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckClone[i], deckClone[j]] = [deckClone[j], deckClone[i]];
  }
  return deckClone;
}

export function drawStartingHand(deck) {
  const hand = deck.slice(0, 10);
  const remainingDeck = deck.slice(10);

  return { hand, remainingDeck };
}

export function drawCards(deck, count) {
  const actualCount = Math.min(count, deck.length);

  const drawnCards = deck.slice(0, actualCount);
  const remainingDeck = deck.slice(actualCount);

  return { drawnCards, remainingDeck };
}

export function addToDiscard(discardPile, cards) {
  const cardsToAdd = Array.isArray(cards) ? cards : [cards];
  const newDiscardPile = [...discardPile, ...cardsToAdd];

  return newDiscardPile;
}

export function getDiscardPile(discardPile, filter = null) {
  if (!filter) {
    return discardPile;
  }

  if (filter === "unit") {
    return discardPile.filter(
      (card) => card.type === CARD_TYPES.UNIT && !card.hero
    );
  }

  return discardPile;
}
