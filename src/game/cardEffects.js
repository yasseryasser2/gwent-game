import { drawCards, drawCards } from "../data/decks";
import { ABILITIES, CARD_TYPES } from "../data/constants";

export const handleSpyAbility = (gameState, card, player, targetRow) => {
  let opponent;

  if (player === "player") {
    opponent = "opponent";
  } else {
    opponent = "player";
  }

  const newOpponentRows = {
    ...gameState[opponent].rows,
    [targetRow]: [gameState[opponent].rows[targetRow], card],
  };

  let yourDeck = gameState[player].deck;
  const { drawCards, remainingDeck } = drawCards(yourDeck, 2);

  const newHand = [...gameState[player].hand, ...drawCards];
  return {
    ...gameState,
    [player]: {
      ...gameState[player],
      hand: newHand,
      deck: remainingDeck,
    },
    [opponent]: {
      ...gameState[opponent],
      rows: newOpponentRows,
    },
  };
};

export const handleMusterAbility = (gameState, card, player, targetRow) => {
  const matchingInHand = gameState[player].hand.filter(
    (c) => c.name === card.name && c.instanceId !== card.instanceId
  );

  const matchingInDeck = gameStatep[player].deck.filter(
    (c) => c.name === card.name && c.instanceId !== card.instanceId
  );

  const allMusterCards = [card, ...matchingInHand, ...matchingInDeck];

  const newHand = gameStatep[player].matchingInHand.filter(
    (c) => c.name === card.name && c.instanceId !== card.instanceId
  );

  const newDeck = gameStatep[player].matchingInDeck.filter(
    (c) => c.name === card.name && c.instanceId !== card.instanceId
  );
  const newRows = {
    ...gameState[player].rows,
    [targetRow]: [...gameState[player].rows[targetRow], ...allMusterCards],
  };

  return {
    ...gameState,
    [player]: {
      ...gameState[player],
      hand: newHand,
      deck: newDeck,
      rows: newRows,
    },
  };
};

export const handleTightBondAbility = (gameState, card, player, targetRow) => {
  return gameState;
};
export const handleMoraleBoostAbility = (
  gameState,
  card,
  player,
  targetRow
) => {
  return gameState;
};
export const handleMedicAbility = (gameState, card, player) => {
  return gameState;
};
export const applyCardAbility = (gameState, card, player, targetRow) => {
  if (!card.ability) {
    return gameState;
  }

  switch (card.ability) {
    case ABILITIES.SPY:
      return handleSpyAbility(gameState, card, player, targetRow);

    case ABILITIES.MUSTER:
      return handleMusterAbility(gameState, card, player, targetRow);

    case ABILITIES.TIGHT_BOND:
      return handleTightBondAbility(gameState, card, player, targetRow);

    case ABILITIES.MORALE_BOOST:
      return handleMoraleBoostAbility(gameState, card, player, targetRow);

    case ABILITIES.MEDIC:
      return handleMedicAbility(gameState, card, player);

    default:
      console.log(`Unknown ability: ${card.ability}`);
      return gameState;
  }
};
