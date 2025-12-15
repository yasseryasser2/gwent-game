import { useState, useCallback, useEffect, useRef } from "react";
import {
  createInitialState,
  calculateScore,
  resetRoundState,
} from "../game/gameState";
import { decideOpponentAction } from "../game/aiLogic";
import { applyCardAbility } from "../game/cardEffects";

export function useGameState() {
  const [gameState, setGameState] = useState(() => createInitialState());
  const isProcessingAI = useRef(false);

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

    updatedState = {
      ...updatedState,
      gamePhase: "round_end",
    };

    const nextRoundState = resetRoundState(updatedState);
    return nextRoundState;
  }, []);

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

      let updatedState;

      if (card.ability) {
        console.log(`Playing ${card.name} with ability: ${card.ability}`);

        const newHand = currentState.player.hand.filter(
          (c) => c.instanceId !== card.instanceId
        );

        const stateAfterHandRemoval = {
          ...currentState,
          player: {
            ...currentState.player,
            hand: newHand,
          },
        };

        updatedState = applyCardAbility(
          stateAfterHandRemoval,
          card,
          "player",
          targetRow
        );
      } else {
        console.log(`Playing ${card.name} (no ability)`);

        const newHand = currentState.player.hand.filter(
          (c) => c.instanceId !== card.instanceId
        );

        const newRows = {
          ...currentState.player.rows,
          [targetRow]: [...currentState.player.rows[targetRow], card],
        };

        updatedState = {
          ...currentState,
          player: {
            ...currentState.player,
            hand: newHand,
            rows: newRows,
          },
        };
      }

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

      if (!updatedState.opponent.hasPassed) {
        updatedState = {
          ...updatedState,
          currentTurn: "opponent",
        };
      }

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
    if (isProcessingAI.current) {
      console.log("[GUARD] AI already processing, skipping turn");
      return;
    }

    isProcessingAI.current = true;

    setGameState((currentState) => {
      if (
        currentState.currentTurn !== "opponent" ||
        currentState.gamePhase !== "playing"
      ) {
        isProcessingAI.current = false;
        return currentState;
      }

      const aiDecision = decideOpponentAction(currentState);

      if (aiDecision.action === "pass") {
        console.log("AI Decision: PASS");
        isProcessingAI.current = false;

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

        return {
          ...updatedState,
          currentTurn: "player",
        };
      }

      if (aiDecision.action === "play") {
        console.log(
          `AI Decision: PLAY ${aiDecision.card.name} on ${aiDecision.targetRow}`
        );
        isProcessingAI.current = false;

        let updatedState;

        if (aiDecision.card.ability) {
          console.log(
            `AI playing ${aiDecision.card.name} with ability: ${aiDecision.card.ability}`
          );

          const newHand = currentState.opponent.hand.filter(
            (c) => c.instanceId !== aiDecision.card.instanceId
          );

          const stateAfterHandRemoval = {
            ...currentState,
            opponent: {
              ...currentState.opponent,
              hand: newHand,
            },
          };

          updatedState = applyCardAbility(
            stateAfterHandRemoval,
            aiDecision.card,
            "opponent",
            aiDecision.targetRow
          );
        } else {
          const newHand = currentState.opponent.hand.filter(
            (c) => c.instanceId !== aiDecision.card.instanceId
          );

          const newRows = {
            ...currentState.opponent.rows,
            [aiDecision.targetRow]: [
              ...currentState.opponent.rows[aiDecision.targetRow],
              aiDecision.card,
            ],
          };

          updatedState = {
            ...currentState,
            opponent: {
              ...currentState.opponent,
              hand: newHand,
              rows: newRows,
            },
          };
        }

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

        return {
          ...updatedState,
          currentTurn: "player",
        };
      }

      if (aiDecision.action === "play_and_continue") {
        console.log(`AI Decision: PLAY ${aiDecision.card.name} and CONTINUE`);

        let updatedState;

        if (aiDecision.card.ability) {
          const newHand = currentState.opponent.hand.filter(
            (c) => c.instanceId !== aiDecision.card.instanceId
          );

          const stateAfterHandRemoval = {
            ...currentState,
            opponent: {
              ...currentState.opponent,
              hand: newHand,
            },
          };

          updatedState = applyCardAbility(
            stateAfterHandRemoval,
            aiDecision.card,
            "opponent",
            aiDecision.targetRow
          );
        } else {
          const newHand = currentState.opponent.hand.filter(
            (c) => c.instanceId !== aiDecision.card.instanceId
          );

          const newRows = {
            ...currentState.opponent.rows,
            [aiDecision.targetRow]: [
              ...currentState.opponent.rows[aiDecision.targetRow],
              aiDecision.card,
            ],
          };

          updatedState = {
            ...currentState,
            opponent: {
              ...currentState.opponent,
              hand: newHand,
              rows: newRows,
            },
          };
        }

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

        if (updatedState.opponent.score > updatedState.player.score) {
          console.log("AI: Now winning after card - passing!");
          isProcessingAI.current = false;

          updatedState = {
            ...updatedState,
            opponent: {
              ...updatedState.opponent,
              hasPassed: true,
            },
          };

          return handleRoundEnd(updatedState);
        }

        console.log("AI: Still losing, will play another card");
        setTimeout(() => {
          isProcessingAI.current = false;
        }, 1000);

        return updatedState;
      }

      if (aiDecision.action === "play_and_continue") {
        console.log(`AI Decision: PLAY ${aiDecision.card.name} and CONTINUE`);

        let updatedState;

        if (aiDecision.card.ability) {
          console.log(
            `[DEBUG] Opponent hand BEFORE removing card:`,
            currentState.opponent.hand.length
          );

          const newHand = currentState.opponent.hand.filter(
            (c) => c.instanceId !== aiDecision.card.instanceId
          );

          console.log(
            `[DEBUG] Opponent hand AFTER removing card:`,
            newHand.length
          );

          const stateAfterHandRemoval = {
            ...currentState,
            opponent: {
              ...currentState.opponent,
              hand: newHand,
            },
          };

          console.log(
            `[DEBUG] About to call applyCardAbility for ${aiDecision.card.ability}`
          );
          updatedState = applyCardAbility(
            stateAfterHandRemoval,
            aiDecision.card,
            "opponent",
            aiDecision.targetRow
          );
          console.log(
            `[DEBUG] After applyCardAbility - opponent hand:`,
            updatedState.opponent.hand.length
          );
          console.log(
            `[DEBUG] After applyCardAbility - opponent ${aiDecision.targetRow} row:`,
            updatedState.opponent.rows[aiDecision.targetRow].length
          );
        } else {
          const newHand = currentState.opponent.hand.filter(
            (c) => c.instanceId !== aiDecision.card.instanceId
          );

          const newRows = {
            ...currentState.opponent.rows,
            [aiDecision.targetRow]: [
              ...currentState.opponent.rows[aiDecision.targetRow],
              aiDecision.card,
            ],
          };

          updatedState = {
            ...currentState,
            opponent: {
              ...currentState.opponent,
              hand: newHand,
              rows: newRows,
              hasPassed: true,
            },
          };
        }

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

        return handleRoundEnd(updatedState);
      }

      isProcessingAI.current = false;
      return currentState;
    });
  }, [handleRoundEnd]);

  useEffect(() => {
    if (
      gameState.currentTurn === "opponent" &&
      gameState.gamePhase === "playing" &&
      !isProcessingAI.current
    ) {
      const timer = setTimeout(() => {
        playOpponentTurn();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [
    gameState.currentTurn,
    gameState.gamePhase,
    gameState.opponent.hand.length,
    gameState.opponent.rows.melee.length,
    gameState.opponent.rows.ranged.length,
    gameState.opponent.rows.siege.length,
    playOpponentTurn,
  ]);

  return {
    gameState,
    playCard,
    pass,
  };
}
