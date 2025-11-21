import React from "react";
import Card from "./Card";

export default function Row({
  rowType,
  cards,
  isPlayerRow,
  hasHorn,
  weatherActive,
}) {
  function calculateRowScore() {
    let heroScore = 0; // Heroes are never affected
    let regularScore = 0; // Regular units get buffs/debuffs

    cards.forEach((card) => {
      if (card.hero) {
        // Heroes: base power only, no modifications
        heroScore += card.power;
      } else {
        // Regular cards: affected by weather
        let cardPower = card.power;

        if (weatherActive) {
          cardPower = 1;
        }

        regularScore += cardPower;
      }
    });

    // Horn only affects non-hero cards
    if (hasHorn) {
      regularScore = regularScore * 2;
    }

    return heroScore + regularScore;
  }

  const totalScore = calculateRowScore();

  return (
    <div
      style={{
        border: "2px solid #666",
        backgroundColor: isPlayerRow ? "#1e3a1e" : "#3a1e1e",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      {/* Header section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      >
        <span>{rowType.toUpperCase()} ROW</span>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Show horn icon if active */}
          {hasHorn && <span style={{ fontSize: "20px" }}>🎺</span>}

          {/* Show weather icon if active */}
          {weatherActive && <span style={{ fontSize: "20px" }}>⛈️</span>}

          <span
            style={{
              fontSize: "20px",
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "5px 15px",
              borderRadius: "5px",
            }}
          >
            Score: {totalScore}
          </span>
        </div>
      </div>

      {/* Cards section */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          minHeight: "100px",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.2)",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        {cards.length === 0 ? (
          <div
            style={{
              color: "#888",
              fontStyle: "italic",
              margin: "auto",
            }}
          >
            Empty row
          </div>
        ) : (
          cards.map((card, index) => (
            <Card
              key={card.instanceId || index}
              card={card}
              onClick={() => {}}
              isPlayable={false}
              size="small"
            />
          ))
        )}
      </div>
    </div>
  );
}
