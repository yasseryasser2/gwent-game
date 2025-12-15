import React from "react";

/**
 * ScoreDisplay component
 *
 * Displays the current round information, player and opponent scores,
 * and visual indicators for rounds won by each side.
 *
 * @param {Object} props
 * @param {number} props.playerScore - Current score of the player
 * @param {number} props.opponentScore - Current score of the opponent
 * @param {number} props.playerRoundsWon - Number of rounds won by the player
 * @param {number} props.opponentRoundsWon - Number of rounds won by the opponent
 * @param {number} props.currentRound - The current round number
 */
export default function ScoreDisplay({
  playerScore,
  opponentScore,
  playerRoundsWon,
  opponentRoundsWon,
  currentRound,
}) {
  /**
   * Renders round indicators based on how many rounds have been won.
   *
   * @param {number} roundsWon - Number of rounds won
   * @param {boolean} isPlayer - Whether the indicators are for the player
   * @returns {JSX.Element[]} Array of span elements representing round status
   */
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

      <div
        style={{
          height: "2px",
          background: "#444",
          margin: "10px 0",
        }}
      ></div>

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
