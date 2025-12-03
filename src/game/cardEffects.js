import { drawCards, drawCards } from "../data/decks";
import { ABILITIES, CARD_TYPES } from "../data/constants";

export const handleSpyAbility = (gameState, card, player, targetRow) => {
  let opponent;

  if (player === "player") {
    opponent = "opponent";
  } else {
    opponent = "player";
  }

  const opponentRows = {
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
