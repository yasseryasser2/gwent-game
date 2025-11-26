import { createDeck, shuffleDeck, drawStartingHand } from "../data/decks";
import { northernRealmsCards } from "../data/cards";

export const createInitialState = () => {
  const playerFullDeck = createDeck(northernRealmsCards);
  const playerShuffled = shuffleDeck(playerFullDeck);
  const { hand: playerHand, remainingDeck: playerDeck } =
    drawStartingHand(playerShuffled);

  const opponentFullDeck = createDeck(northernRealmsCards);
  const opponentShuffled = shuffleDeck(opponentFullDeck);
  const { hand: opponentHand, remainingDeck: opponentDeck } =
    drawStartingHand(opponentShuffled);

  return {
    player: {
      hand: playerHand,
      deck: playerDeck,
      discard: [],
      rows: {
        melee: [],
        ranged: [],
        siege: [],
      },
      score: 0,
      totalScore: 0,
      roundsWon: 0,
      hasPassed: false,
    },
    opponent: {
      hand: opponentHand,
      deck: opponentDeck,
      discard: [],
      rows: {
        melee: [],
        ranged: [],
        siege: [],
      },
      score: 0,
      totalScore: 0,
      roundsWon: 0,
      hasPassed: false,
    },
    currentRound: 1,
    currentTurn: "player",
    gamePhase: "playing",
    weatherEffects: {
      melee: false,
      ranged: false,
      siege: false,
    },
    hornEffects: {
      player: {
        melee: false,
        ranged: false,
        siege: false,
      },
      opponent: {
        melee: false,
        ranged: false,
        siege: false,
      },
    },
    winner: null,
  };
};
