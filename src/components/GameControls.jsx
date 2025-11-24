import React from "react";

export default function GameControls({
  isPlayerTurn,
  onPass,
  canPass,
  gamePhase,
  turnMessage,
}) {
  function handlePassClick() {
    if (!isButtonDisabled()) {
      onPass();
    }
  }

  function isButtonDisabled() {
    return !isPlayerTurn || !canPass;
  }

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
      {/* SECTION 1: Turn Indicator */}
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

      {/* SECTION 2: Pass Button */}
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

      {/* SECTION 3: Game Phase Indicator */}
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
