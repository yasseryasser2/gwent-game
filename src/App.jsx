import React from "react";
import ScoreDisplay from "./components/ScoreDisplay";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      <ScoreDisplay
        playerScore={42}
        opponentScore={38}
        playerRoundsWon={1}
        opponentRoundsWon={0}
        currentRound={2}
      />
    </div>
  );
}

export default App;
