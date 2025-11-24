import React from "react";

export default function ScoreDisplay({
  playerScore,
  opponentScore,
  playerRoundsWon,
  opponentRoundsWon,
  currentRound,
}) {
  function renderRoundGems(roundsWon, isPlayer) {
    const gems = [];
    const filledGem = isPlayer ? "🟢" : "🔴";
    const emptyGem = "⚪";

    for (let i = 0; i < 2; i++) {
      gems.push(
        <span key={i} style={{ fontSize: "30px", margin: "0 5px" }}>
          {i < roundsWon ? filledGem : emptyGem}
        </span>
      );
    }
    return gems;
  }

  return (
    <div
      style={{
        background: "#1a1a2e",
        border: "3px solid #ffcc00",
        borderRadius: "10px",
        padding: "20px",
        color: "white",
        maxWidth: "600px",
        margin: "0 auto 20px auto",
      }}
    >
      {/* Round indicator */}
      <div
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#ffcc00",
          marginBottom: "15px",
        }}
      >
        ROUND {currentRound} OF 3
      </div>

      {/* Opponent section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#ff6b6b",
        }}
      >
        <span>OPPONENT: {opponentScore}</span>
        <div>{renderRoundGems(opponentRoundsWon, false)}</div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "2px",
          background: "#444",
          margin: "10px 0",
        }}
      ></div>

      {/* Player section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#51cf66",
        }}
      >
        <span>PLAYER: {playerScore}</span>
        <div>{renderRoundGems(playerRoundsWon, true)}</div>
      </div>
    </div>
  );
}
