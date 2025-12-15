import { useGameState } from "./hooks/useGameState";
import Hand from "./components/Hand";
import Board from "./components/Board";
import GameControls from "./components/GameControls";
import ScoreDisplay from "./components/ScoreDisplay";
import "./styles/animations.css";

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
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)",
            animation: "glowPulse 3s ease-in-out infinite",
          }}
        />

        <div
          style={{
            textAlign: "center",
            zIndex: 10,
            animation: "fadeIn 1s ease-in",
          }}
        >
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              background:
                "linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "30px",
              animation: "victoryPulse 2s ease-in-out infinite",
              fontFamily: '"Cinzel", serif',
              letterSpacing: "4px",
            }}
          >
            🎉 GAME OVER 🎉
          </h1>

          <h2
            style={{
              fontSize: "48px",
              color: gameState.winner === "player" ? "#51cf66" : "#ff6b6b",
              marginBottom: "40px",
              textShadow: "0 0 20px currentColor",
              animation: "celebrate 0.8s ease-in-out",
              fontFamily: '"Cinzel", serif',
            }}
          >
            {gameState.winner === "player"
              ? "👑 YOU WIN! 👑"
              : "💀 OPPONENT WINS 💀"}
          </h2>

          <div
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(10px)",
              padding: "30px 50px",
              borderRadius: "15px",
              border: "2px solid rgba(255, 215, 0, 0.3)",
              marginBottom: "40px",
            }}
          >
            <p
              style={{ fontSize: "24px", color: "#ddd", marginBottom: "10px" }}
            >
              Final Score
            </p>
            <p
              style={{ fontSize: "36px", color: "#ffd700", fontWeight: "bold" }}
            >
              {gameState.player.roundsWon} - {gameState.opponent.roundsWon}
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "20px 50px",
              fontSize: "24px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              boxShadow:
                "0 8px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(76, 175, 80, 0.4)",
              transition: "all 0.3s ease",
              fontFamily: '"Cinzel", serif',
              letterSpacing: "2px",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-4px) scale(1.05)";
              e.target.style.boxShadow =
                "0 12px 24px rgba(0, 0, 0, 0.4), 0 0 30px rgba(76, 175, 80, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow =
                "0 8px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(76, 175, 80, 0.4)";
            }}
          >
            ⚔️ PLAY AGAIN ⚔️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        fontFamily: '"Cinzel", serif',
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "320px",
          background:
            "linear-gradient(180deg, rgba(26, 26, 46, 0.95) 0%, rgba(15, 12, 41, 0.95) 100%)",
          backdropFilter: "blur(10px)",
          borderRight: "3px solid rgba(139, 115, 85, 0.5)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: "4px 0 30px rgba(0, 0, 0, 0.7)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "10px",
            paddingBottom: "15px",
            borderBottom: "2px solid rgba(255, 215, 0, 0.3)",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              background:
                "linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "4px",
              textShadow: "0 0 30px rgba(255, 215, 0, 0.6)",
              margin: 0,
            }}
          >
            ⚔️ GWENT ⚔️
          </h1>
        </div>

        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            border: "2px solid rgba(139, 115, 85, 0.6)",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              paddingBottom: "15px",
              borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#ffd700",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              ROUND {gameState.currentRound} OF 3
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              marginBottom: "15px",
              background: "rgba(255, 107, 107, 0.1)",
              borderRadius: "8px",
              border: "1px solid rgba(255, 107, 107, 0.3)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#ff6b6b",
                  marginBottom: "4px",
                }}
              >
                OPPONENT
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#ff6b6b",
                }}
              >
                {gameState.opponent.score}
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[0, 1].map((i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "32px",
                    filter:
                      i < gameState.opponent.roundsWon
                        ? "none"
                        : "grayscale(100%) brightness(0.5)",
                  }}
                >
                  🔴
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(139, 115, 85, 0.6) 50%, transparent 100%)",
              margin: "15px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              background: "rgba(81, 207, 102, 0.1)",
              borderRadius: "8px",
              border: "1px solid rgba(81, 207, 102, 0.3)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#51cf66",
                  marginBottom: "4px",
                }}
              >
                PLAYER
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#51cf66",
                }}
              >
                {gameState.player.score}
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[0, 1].map((i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "32px",
                    filter:
                      i < gameState.player.roundsWon
                        ? "none"
                        : "grayscale(100%) brightness(0.5)",
                  }}
                >
                  🟢
                </div>
              ))}
            </div>
          </div>
        </div>

        <GameControls
          isPlayerTurn={gameState.currentTurn === "player"}
          onPass={pass}
          canPass={!gameState.player.hasPassed}
          gamePhase={gameState.gamePhase}
          turnMessage={
            gameState.currentTurn === "player"
              ? "Play a card or pass"
              : "Opponent is playing..."
          }
        />

        <div
          style={{
            background: "rgba(81, 207, 102, 0.1)",
            border: "2px solid rgba(81, 207, 102, 0.3)",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h3
            style={{
              color: "#51cf66",
              fontSize: "16px",
              marginBottom: "12px",
              textAlign: "center",
              letterSpacing: "1px",
            }}
          >
            📊 YOUR STATS
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#ccc",
                fontSize: "14px",
              }}
            >
              <span>Hand:</span>
              <span style={{ fontWeight: "bold", color: "#51cf66" }}>
                {gameState.player.hand.length}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#ccc",
                fontSize: "14px",
              }}
            >
              <span>Deck:</span>
              <span style={{ fontWeight: "bold", color: "#51cf66" }}>
                {gameState.player.deck.length}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#ccc",
                fontSize: "14px",
              }}
            >
              <span>Discard:</span>
              <span style={{ fontWeight: "bold", color: "#888" }}>
                {gameState.player.discard.length}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255, 107, 107, 0.1)",
            border: "2px solid rgba(255, 107, 107, 0.3)",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h3
            style={{
              color: "#ff6b6b",
              fontSize: "16px",
              marginBottom: "12px",
              textAlign: "center",
              letterSpacing: "1px",
            }}
          >
            🎯 OPPONENT STATS
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#ccc",
                fontSize: "14px",
              }}
            >
              <span>Hand:</span>
              <span style={{ fontWeight: "bold", color: "#ff6b6b" }}>
                {gameState.opponent.hand.length}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#ccc",
                fontSize: "14px",
              }}
            >
              <span>Deck:</span>
              <span style={{ fontWeight: "bold", color: "#ff6b6b" }}>
                {gameState.opponent.deck.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1500px",
            height: "1600px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Board
            playerRows={gameState.player.rows}
            opponentRows={gameState.opponent.rows}
            playerScore={gameState.player.score}
            opponentScore={gameState.opponent.score}
            weatherEffects={gameState.weatherEffects}
            hornEffects={gameState.hornEffects}
          />
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            height: "260px",
          }}
        >
          <Hand
            cards={gameState.player.hand}
            onCardClick={handleCardClick}
            isPlayerTurn={
              gameState.currentTurn === "player" && !gameState.player.hasPassed
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
