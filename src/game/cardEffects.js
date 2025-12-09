import { drawCards } from "../data/decks";
import { ABILITIES, CARD_TYPES } from "../data/constants";

export const handleSpyAbility = (gameState, card, player, targetRow) => {
  const opponent = player === "player" ? "opponent" : "player";

  const newOpponentRows = {
    ...gameState[opponent].rows,
    [targetRow]: [...gameState[opponent].rows[targetRow], card],
  };

  const yourDeck = gameState[player].deck;
  const { drawnCards, remainingDeck } = drawCards(yourDeck, 2);

  const newHand = [...gameState[player].hand, ...drawnCards];

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
  console.log(`[MUSTER] Playing ${card.name} (${card.instanceId})`);
  console.log(
    `[MUSTER] Hand before:`,
    gameState[player].hand.map((c) => c.name)
  );

  const matchingInHand = gameState[player].hand.filter(
    (c) => c.name === card.name && c.instanceId !== card.instanceId
  );

  console.log(`[MUSTER] Found ${matchingInHand.length} matching cards in hand`);

  const matchingInDeck = gameState[player].deck.filter(
    (c) => c.name === card.name && c.instanceId !== card.instanceId
  );

  console.log(`[MUSTER] Found ${matchingInDeck.length} matching cards in deck`);

  const allMusterCards = [card, ...matchingInHand, ...matchingInDeck];

  console.log(`[MUSTER] Total cards to play: ${allMusterCards.length}`);

  const newHand = gameState[player].hand.filter(
    (c) => !matchingInHand.some((match) => match.instanceId === c.instanceId)
  );

  console.log(
    `[MUSTER] Hand after:`,
    newHand.map((c) => c.name)
  );

  const newDeck = gameState[player].deck.filter(
    (c) => !matchingInDeck.some((match) => match.instanceId === c.instanceId)
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
  const newRows = {
    ...gameState[player].rows,
    [targetRow]: [...gameState[player].rows[targetRow], card],
  };

  return {
    ...gameState,
    [player]: {
      ...gameState[player],
      rows: newRows,
    },
  };
};

export const handleMoraleBoostAbility = (
  gameState,
  card,
  player,
  targetRow
) => {
  const newRows = {
    ...gameState[player].rows,
    [targetRow]: [...gameState[player].rows[targetRow], card],
  };

  return {
    ...gameState,
    [player]: {
      ...gameState[player],
      rows: newRows,
    },
  };
};

export const handleMedicAbility = (gameState, card, player, targetRow) => {
  const newRows = {
    ...gameState[player].rows,
    [targetRow]: [...gameState[player].rows[targetRow], card],
  };

  return {
    ...gameState,
    [player]: {
      ...gameState[player],
      rows: newRows,
    },
  };
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
      return handleMedicAbility(gameState, card, player, targetRow);

    default:
      console.log(`Unknown ability: ${card.ability}`);
      return gameState;
  }
};
