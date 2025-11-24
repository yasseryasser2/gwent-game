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
}
