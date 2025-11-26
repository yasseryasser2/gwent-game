import { useState, useCallback } from "react";
import { createInitialState, calculateScore } from "../game/gameState";
import { addToDiscard } from "../data/decks";
import { ROWS, ABILITIES } from "../data/constants";

export function useGameState() {
  const [gameState, setGameState] = useState(() => createInitialState());

  const playCard = useCallback((card, targetRow) => {
    setGameState((currentState) => {
      if (currentState.currentTurn !== "player") {
        console.log("Not your turn!");
        return currentState;
      }

      if (currentState.player.hasPassed) {
        console.log("You already passed!");
        return currentState;
      }

      const cardInHand = currentState.player.hand.find(
        (c) => c.instanceId === card.instanceId
      );
      if (!cardInHand) {
        console.log("Card not in hand!");
        return currentState;
      }

      if (card.row && card.row !== targetRow) {
        console.log("Invalid row for this card!");
        return currentState;
      }

      const newHand = currentState.player.hand.filter(
        (c) => c.instanceId !== card.instanceId
      );

      const newRows = {
        ...currentState.player.rows,
        [targetRow]: [...currentState.player.rows[targetRow], card],
      };

      let updatedState = {
        ...currentState,
        player: {
          ...currentState.player,
          hand: newHand,
          rows: newRows,
        },
      };

      const playerScore = calculateScore(
        updatedState.player.rows,
        updatedState.weatherEffects,
        updatedState.hornEffects.player
      );

      const opponentScore = calculateScore(
        updatedState.opponent.rows,
        updatedState.weatherEffects,
        updatedState.hornEffects.opponent
      );

      updatedState = {
        ...updatedState,
        player: {
          ...updatedState.player,
          score: playerScore,
        },
        opponent: {
          ...updatedState.opponent,
          score: opponentScore,
        },
      };

      updatedState = {
        ...updatedState,
        currentTurn: "opponent",
      };

      return updatedState;
    });
  }, []);

  return {
    gameState,
    playCard,
  };
}
