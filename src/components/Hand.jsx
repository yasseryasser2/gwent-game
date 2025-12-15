import React from "react";
import Card from "./Card";

/**
 * Hand component
 *
 * Displays the player's current hand of cards. Shows a placeholder message
 * when the hand is empty and renders individual Card components otherwise.
 *
 * @param {Object} props
 * @param {Array} props.cards - Array of card objects currently in the hand
 * @param {Function} props.onCardClick - Callback invoked when a card is clicked
 * @param {boolean} props.isPlayerTurn - Whether it is currently the player's turn
 */
export default function Hand({ cards, onCardClick, isPlayerTurn }) {
  /**
   * Render a fallback message when there are no cards in hand.
   */
  if (cards.length === 0) {
    return (
      <div
        style={{
          color: "white",
          padding: "20px",
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        No cards in hand
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#2a2a2a",
        padding: "20px",
        borderRadius: "10px",
        border: "2px solid #444",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "15px",
          fontSize: "18px",
        }}
      >
        Cards in hand: {cards.length}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.instanceId || index}
            card={card}
            onClick={onCardClick}
            isPlayable={isPlayerTurn}
          />
        ))}
      </div>
    </div>
  );
}
