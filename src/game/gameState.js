import {
  createDeck,
  shuffleDeck,
  drawStartingHand,
  drawCards,
} from "../data/decks";
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

export const resetRoundState = (currentState) => {
  const playerRowCards = [
    ...currentState.player.rows.melee,
    ...currentState.player.rows.ranged,
    ...currentState.player.rows.siege,
  ];

  const opponentRowCards = [
    ...currentState.opponent.rows.melee,
    ...currentState.opponent.rows.ranged,
    ...currentState.opponent.rows.siege,
  ];

  const playerNewDiscard = [...currentState.player.discard, ...playerRowCards];
  const opponentNewDiscard = [
    ...currentState.opponent.discard,
    ...opponentRowCards,
  ];

  let playerNewHand = [...currentState.player.hand];
  let playerNewDeck = [...currentState.player.deck];

  if (playerNewDeck.length > 0) {
    const { drawnCards, remainingDeck } = drawCards(playerNewDeck, 1);
    playerNewHand = [...playerNewHand, ...drawnCards];
    playerNewDeck = remainingDeck;
  }

  let opponentNewHand = [...currentState.opponent.hand];
  let opponentNewDeck = [...currentState.opponent.deck];

  if (opponentNewDeck.length > 0) {
    const { drawnCards, remainingDeck } = drawCards(opponentNewDeck, 1);
    opponentNewHand = [...opponentNewHand, ...drawnCards];
    opponentNewDeck = remainingDeck;
  }
  return {
    ...currentState,
    player: {
      ...currentState.player,
      hand: playerNewHand,
      deck: playerNewDeck,
      discard: playerNewDiscard,
      rows: {
        melee: [],
        ranged: [],
        siege: [],
      },
      score: 0,
      hasPassed: false,
    },
    opponent: {
      ...currentState.opponent,
      hand: opponentNewHand,
      deck: opponentNewDeck,
      discard: opponentNewDiscard,
      rows: {
        melee: [],
        ranged: [],
        siege: [],
      },
      score: 0,
      hasPassed: false,
    },
    currentRound: currentState.currentRound + 1,
    currentTurn: "player",
    gamePhase: "playing",
    weatherEffects: {
      melee: false,
      ranged: false,
      siege: false,
    },
    hornEffects: {
      player: { melee: false, ranged: false, siege: false },
      opponent: { melee: false, ranged: false, siege: false },
    },
  };
};

export const calculateScore = (rows, weatherEffects, hornEffects) => {
  let totalScore = 0;

  ["melee", "ranged", "siege"].forEach((rowType) => {
    let heroScore = 0;
    let regularScore = 0;

    rows[rowType].forEach((card) => {
      if (card.hero) {
        heroScore += card.power;
      } else {
        let cardPower = card.power;
        if (weatherEffects[rowType]) {
          cardPower = 1;
        }
        regularScore += cardPower;
      }
    });

    if (hornEffects[rowType]) {
      regularScore = regularScore * 2;
    }

    totalScore += heroScore + regularScore;
  });

  return totalScore;
};
