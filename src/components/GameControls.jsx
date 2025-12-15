import React from "react";

/**
 * GameControls component
 *
 * Renders turn status information, a pass button, and the current game phase.
 * Handles enabling/disabling the pass action based on game state.
 *
 * @param {Object} props
 * @param {boolean} props.isPlayerTurn - Whether it is currently the player's turn
 * @param {Function} props.onPass - Callback invoked when the player chooses to pass
 * @param {boolean} props.canPass - Whether passing is allowed in the current state
 * @param {string} props.gamePhase - Current phase of the game
 * @param {string} props.turnMessage - Informational message describing the turn state
 */
export default function GameControls({
  isPlayerTurn,
  onPass,
  canPass,
  gamePhase,
  turnMessage,
}) {
  /**
   * Handles click events for the pass button.
   * Invokes the onPass callback if the button is not disabled.
   */
  function handlePassClick() {
    if (!isButtonDisabled()) {
      onPass();
    }
  }

  /**
   * Determines whether the pass button should be disabled.
   *
   * @returns {boolean} True if the button should be disabled
   */
  function isButtonDisabled() {
    return !isPlayerTurn || !canPass;
  }

  /**
   * Determines the text displayed on the pass button
   * based on the current game and turn state.
   *
   * @returns {string} Button label text
   */
  function getButtonText() {
    if (isButtonDisabled()) {
      if (!isPlayerTurn) {
        return "Opponent's Turn";
      }
      if (!canPass) {
        return "Cannot Pass Yet";
      }
    }
    return "PASS";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#1a1a2e",
        border: "2px solid #444",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "15px",
          borderRadius: "8px",
          width: "100%",
          backgroundColor: isPlayerTurn
            ? "rgba(81, 207, 102, 0.2)"
            : "rgba(255, 107, 107, 0.2)",
          border: `2px solid ${isPlayerTurn ? "#51cf66" : "#ff6b6b"}`,
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: isPlayerTurn ? "#51cf66" : "#ff6b6b",
            marginBottom: "8px",
          }}
        >
          {isPlayerTurn ? "YOUR TURN" : "OPPONENT'S TURN"}
        </div>
        <div
          style={{
            fontSize: "16px",
            color: "#ccc",
          }}
        >
          {turnMessage}
        </div>
      </div>

      <button
        onClick={handlePassClick}
        disabled={isButtonDisabled()}
        style={{
          backgroundColor: isButtonDisabled() ? "#666" : "#4CAF50",
          color: isButtonDisabled() ? "#999" : "white",
          fontSize: "24px",
          fontWeight: "bold",
          padding: "15px 40px",
          border: "none",
          borderRadius: "8px",
          cursor: isButtonDisabled() ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          width: "100%",
        }}
        onMouseEnter={(e) => {
          if (!isButtonDisabled()) {
            e.target.style.backgroundColor = "#45a049";
            e.target.style.transform = "scale(1.05)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isButtonDisabled()) {
            e.target.style.backgroundColor = "#4CAF50";
            e.target.style.transform = "scale(1)";
          }
        }}
      >
        {getButtonText()}
      </button>

      <div
        style={{
          fontSize: "14px",
          color: "#888",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Phase: {gamePhase.toUpperCase()}
      </div>
    </div>
  );
}
