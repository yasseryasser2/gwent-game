import React from "react";
import Card from "./Card";

export default function Hand({ cards, onCardClick, isPlayerTurn }) {
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
      {/* Card count */}
      <h2
        style={{
          color: "white",
          marginBottom: "15px",
          fontSize: "18px",
        }}
      >
        Cards in hand: {cards.length}
      </h2>

      {/* Cards container */}
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
