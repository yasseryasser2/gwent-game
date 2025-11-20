import React from "react";
import { CARD_TYPES } from "../data/constants";

export default function Card({
  card,
  onClick,
  isPlayable = true,
  size = "medium",
}) {
  function handleClick() {
    if (!isPlayable) return;
    if (onClick) onClick(card);
  }

  function getCardBackground() {
    switch (card.type) {
      case CARD_TYPES.UNIT:
        return "navy";
      case CARD_TYPES.HERO:
        return "gold";
      case CARD_TYPES.SPECIAL:
        return "purple";
      case CARD_TYPES.WEATHER:
        return "gray";
      default:
        return "black";
    }
  }

  // Build className string
  const cardClasses = [
    "card",
    `card-${size}`,
    isPlayable ? "card-playable" : "card-disabled",
    card.hero ? "card-hero" : "",
  ].join(" ");

  // Card styles
  const cardStyle = {
    width: size === "small" ? "100px" : size === "large" ? "200px" : "150px",
    height: size === "small" ? "140px" : size === "large" ? "280px" : "210px",
    backgroundColor: getCardBackground(),
    border: card.hero ? "3px solid gold" : "2px solid white",
    borderRadius: "8px",
    padding: "10px",
    cursor: isPlayable ? "pointer" : "not-allowed",
    opacity: isPlayable ? 1 : 0.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const hoverStyle = isPlayable
    ? {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
      }
    : {};

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      style={cardStyle}
      onMouseEnter={(e) => {
        if (isPlayable) {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top section - Power and Ability */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Power value */}
        {card.power !== null && (
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "5px 10px",
              borderRadius: "4px",
            }}
          >
            {card.power}
          </div>
        )}

        {/* Ability indicator */}
        {card.ability && (
          <div
            style={{
              fontSize: "12px",
              backgroundColor: "rgba(0,0,0,0.7)",
              padding: "3px 6px",
              borderRadius: "3px",
            }}
          >
            {card.ability}
          </div>
        )}
      </div>

      {/* Middle section - Card image placeholder */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          textAlign: "center",
          padding: "10px",
        }}
      >
        {card.hero && (
          <div
            style={{
              backgroundColor: "rgba(255, 215, 0, 0.3)",
              padding: "5px 10px",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            ★ HERO ★
          </div>
        )}
      </div>

      {/* Bottom section - Card name */}
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "5px",
          borderRadius: "4px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {card.name}
      </div>
    </div>
  );
}
