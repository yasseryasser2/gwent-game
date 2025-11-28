import { useGameState } from "./hooks/useGameState";
import Hand from "./components/Hand";
import Board from "./components/Board";
import GameControls from "./components/GameControls";
import ScoreDisplay from "./components/ScoreDisplay";

function App() {
  const { gameState, playCard, pass } = useGameState();

  const handleCardClick = (card) => {
    const targetRow = card.row || "melee";
    playCard(card, targetRow);
  };

  if (gameState.gamePhase === "game_over") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#1a1a1a",
          color: "white",
          fontSize: "48px",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1>🎉 Game Over! 🎉</h1>
        <h2>{gameState.winner === "player" ? "YOU WIN!" : "OPPONENT WINS!"}</h2>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "15px 30px",
            fontSize: "24px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
        ⚔️ Gwent Card Game ⚔️
      </h1>

      <ScoreDisplay
        playerScore={gameState.player.score}
        opponentScore={gameState.opponent.score}
        playerRoundsWon={gameState.player.roundsWon}
        opponentRoundsWon={gameState.opponent.roundsWon}
        currentRound={gameState.currentRound}
      />

      <Board
        playerRows={gameState.player.rows}
        opponentRows={gameState.opponent.rows}
        playerScore={gameState.player.score}
        opponentScore={gameState.opponent.score}
        weatherEffects={gameState.weatherEffects}
        hornEffects={gameState.hornEffects}
      />

      <GameControls
        isPlayerTurn={gameState.currentTurn === "player"}
        onPass={pass}
        canPass={!gameState.player.hasPassed}
        gamePhase={gameState.gamePhase}
        turnMessage={
          gameState.currentTurn === "player"
            ? "Your turn - play a card or pass"
            : "Opponent is playing..."
        }
      />

      <Hand
        cards={gameState.player.hand}
        onCardClick={handleCardClick}
        isPlayerTurn={
          gameState.currentTurn === "player" && !gameState.player.hasPassed
        }
      />
    </div>
  );
}

export default App;
