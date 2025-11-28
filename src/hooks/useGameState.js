import { useState, useCallback, useEffect } from "react";
import {
  createInitialState,
  calculateScore,
  resetRoundState,
} from "../game/gameState";
import { ROWS } from "../data/constants";

export function useGameState() {
  const [gameState, setGameState] = useState(() => createInitialState());

  const determineRoundWinner = (state) => {
    const playerScore = state.player.score;
    const opponentScore = state.opponent.score;

    if (playerScore > opponentScore) {
      return "player";
    } else if (opponentScore > playerScore) {
      return "opponent";
    } else {
      return "draw";
    }
  };

  const handleRoundEnd = useCallback((state) => {
    const roundWinner = determineRoundWinner(state);

    let updatedState = { ...state };

    // Award round win
    if (roundWinner === "player") {
      updatedState = {
        ...updatedState,
        player: {
          ...updatedState.player,
          roundsWon: updatedState.player.roundsWon + 1,
          totalScore:
            updatedState.player.totalScore + updatedState.player.score,
        },
      };
    } else if (roundWinner === "opponent") {
      updatedState = {
        ...updatedState,
        opponent: {
          ...updatedState.opponent,
          roundsWon: updatedState.opponent.roundsWon + 1,
          totalScore:
            updatedState.opponent.totalScore + updatedState.opponent.score,
        },
      };
    }

    // Check if game is over (someone won 2 rounds)
    if (updatedState.player.roundsWon === 2) {
      return {
        ...updatedState,
        gamePhase: "game_over",
        winner: "player",
      };
    }

    if (updatedState.opponent.roundsWon === 2) {
      return {
        ...updatedState,
        gamePhase: "game_over",
        winner: "opponent",
      };
    }

    // Game continues - reset for next round
    updatedState = {
      ...updatedState,
      gamePhase: "round_end",
    };

    const nextRoundState = resetRoundState(updatedState);
    return nextRoundState;
  }, []);

  const playCard = useCallback((card, targetRow) => {
    setGameState((currentState) => {
      // Validation
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

      // Remove from hand, add to board
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

      // Recalculate scores
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

      // Switch turn
      updatedState = {
        ...updatedState,
        currentTurn: "opponent",
      };

      return updatedState;
    });
  }, []);

  const pass = useCallback(() => {
    setGameState((currentState) => {
      if (currentState.currentTurn !== "player") {
        console.log("Not your turn!");
        return currentState;
      }

      if (currentState.player.hasPassed) {
        console.log("Already passed!");
        return currentState;
      }

      let updatedState = {
        ...currentState,
        player: {
          ...currentState.player,
          hasPassed: true,
        },
      };

      if (updatedState.opponent.hasPassed) {
        return handleRoundEnd(updatedState);
      }

      updatedState = {
        ...updatedState,
        currentTurn: "opponent",
      };

      return updatedState;
    });
  }, [handleRoundEnd]);

  const playOpponentTurn = useCallback(() => {
    setGameState((currentState) => {
      if (currentState.currentTurn !== "opponent") {
        return currentState;
      }

      if (currentState.opponent.hasPassed) {
        return currentState;
      }

      const opponentHand = currentState.opponent.hand;

      if (opponentHand.length === 0) {
        let updatedState = {
          ...currentState,
          opponent: {
            ...currentState.opponent,
            hasPassed: true,
          },
        };

        if (updatedState.player.hasPassed) {
          return handleRoundEnd(updatedState);
        }

        updatedState = {
          ...updatedState,
          currentTurn: "player",
        };

        return updatedState;
      }

      const isAhead = currentState.opponent.score > currentState.player.score;
      const shouldPass = isAhead && Math.random() < 0.4;

      if (shouldPass) {
        let updatedState = {
          ...currentState,
          opponent: {
            ...currentState.opponent,
            hasPassed: true,
          },
        };

        if (updatedState.player.hasPassed) {
          return handleRoundEnd(updatedState);
        }

        updatedState = {
          ...updatedState,
          currentTurn: "player",
        };

        return updatedState;
      }

      const randomIndex = Math.floor(Math.random() * opponentHand.length);
      const cardToPlay = opponentHand[randomIndex];

      let targetRow;
      if (cardToPlay.row) {
        targetRow = cardToPlay.row;
      } else {
        const rows = [ROWS.MELEE, ROWS.RANGED, ROWS.SIEGE];
        targetRow = rows[Math.floor(Math.random() * rows.length)];
      }

      const newHand = opponentHand.filter(
        (c) => c.instanceId !== cardToPlay.instanceId
      );

      const newRows = {
        ...currentState.opponent.rows,
        [targetRow]: [...currentState.opponent.rows[targetRow], cardToPlay],
      };

      let updatedState = {
        ...currentState,
        opponent: {
          ...currentState.opponent,
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
        currentTurn: "player",
      };

      return updatedState;
    });
  }, [handleRoundEnd]);

  useEffect(() => {
    if (
      gameState.currentTurn === "opponent" &&
      gameState.gamePhase === "playing"
    ) {
      const timer = setTimeout(() => {
        playOpponentTurn();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameState.currentTurn, gameState.gamePhase, playOpponentTurn]);

  return {
    gameState,
    playCard,
    pass,
  };
}
