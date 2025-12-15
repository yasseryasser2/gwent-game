import React from "react";
import Card from "./Card";
import { ROWS } from "../data/constants";

/**
 * Row component
 *
 * Represents a single row on the board (e.g., melee, ranged, siege).
 * Handles score calculation based on card power, hero status,
 * weather effects, and horn multipliers, and renders the row UI.
 *
 * @param {Object} props
 * @param {string} props.rowType - Identifier for the row type
 * @param {Array} props.cards - Array of card objects placed in this row
 * @param {boolean} props.isPlayerRow - Whether this row belongs to the player
 * @param {boolean} props.hasHorn - Whether a horn effect is active on this row
 * @param {boolean} props.weatherActive - Whether a weather effect is active on this row
 */
export default function Row({
  rowType,
  cards,
  isPlayerRow,
  hasHorn,
  weatherActive,
}) {
  /**
   * Calculates the total score for the row.
   * Hero cards are unaffected by weather and horn effects.
   * Regular cards may be reduced by weather and doubled by a horn.
   *
   * @returns {number} Total calculated row score
   */
  function calculateRowScore() {
    let heroScore = 0;
    let regularScore = 0;

    cards.forEach((card) => {
      if (card.hero) {
        heroScore += card.power;
      } else {
        let cardPower = card.power;
        if (weatherActive) {
          cardPower = 1;
        }
        regularScore += cardPower;
      }
    });

    if (hasHorn) {
      regularScore = regularScore * 2;
    }

    return heroScore + regularScore;
  }

  const totalScore = calculateRowScore();

  return (
    <div
      style={{
        border: "2px solid rgba(139, 115, 85, 0.5)",
        backgroundColor: isPlayerRow
          ? "rgba(30, 58, 30, 0.6)"
          : "rgba(58, 30, 30, 0.6)",
        padding: "10px",
        borderRadius: "8px",
        minHeight: "160px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.4)",
      }}
    >
      {}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "6px",
          borderBottom: "1px solid rgba(139, 115, 85, 0.3)",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            color: "#ffd700",
            letterSpacing: "1px",
          }}
        >
          {rowType.toUpperCase()}
        </span>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {hasHorn && <span style={{ fontSize: "16px" }}>🎺</span>}
          {weatherActive && <span style={{ fontSize: "16px" }}>⛈️</span>}

          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#ffd700",
              background: "rgba(0, 0, 0, 0.5)",
              padding: "4px 10px",
              borderRadius: "6px",
              minWidth: "40px",
              textAlign: "center",
            }}
          >
            {totalScore}
          </span>
        </div>
      </div>

      {}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "nowrap",
          overflowX: "auto",
          overflowY: "visible",
          alignItems: "center",
          minHeight: "60px",
          padding: "5px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(139, 115, 85, 0.6) rgba(0, 0, 0, 0.3)",
        }}
      >
        {cards.length === 0 ? (
          <div
            style={{
              color: "#666",
              fontStyle: "italic",
              fontSize: "12px",
              margin: "auto",
            }}
          >
            Empty row
          </div>
        ) : (
          cards.map((card, index) => (
            <div key={card.instanceId || index} style={{ flexShrink: 0 }}>
              <Card
                card={card}
                onClick={() => {}}
                isPlayable={false}
                size="small"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
