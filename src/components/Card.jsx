import React, { useState } from "react";
import { CARD_TYPES } from "../data/constants";

export default function Card({
  card,
  onClick,
  isPlayable = true,
  size = "medium",
}) {
  const [isHovered, setIsHovered] = useState(false);

  function handleClick() {
    if (!isPlayable) return;
    if (onClick) onClick(card);
  }

  function getCardBackground() {
    switch (card.type) {
      case CARD_TYPES.UNIT:
        return "linear-gradient(135deg, #1e3a5f 0%, #2d4a7c 100%)";
      case CARD_TYPES.HERO:
        return "linear-gradient(135deg, #8b6914 0%, #daa520 50%, #8b6914 100%)";
      case CARD_TYPES.SPECIAL:
        return "linear-gradient(135deg, #4a1e4a 0%, #7c2d7c 100%)";
      case CARD_TYPES.WEATHER:
        return "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)";
      default:
        return "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)";
    }
  }

  const cardSizes = {
    small: { width: "100px", height: "140px", fontSize: "16px" },
    medium: { width: "150px", height: "210px", fontSize: "20px" },
    large: { width: "200px", height: "280px", fontSize: "24px" },
  };

  const currentSize = cardSizes[size];

  const cardStyle = {
    width: currentSize.width,
    height: currentSize.height,
    background: getCardBackground(),
    border: card.hero ? "3px solid gold" : "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    padding: "12px",
    cursor: isPlayable ? "pointer" : "not-allowed",
    opacity: isPlayable ? 1 : 0.5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
    fontFamily: '"Cinzel", serif',
    position: "relative",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform:
      isHovered && isPlayable
        ? "translateY(-20px) scale(1.08)"
        : "translateY(0) scale(1)",
    boxShadow:
      isHovered && isPlayable
        ? "0 25px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)"
        : card.hero
        ? "0 8px 16px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.3)"
        : "0 8px 16px rgba(0, 0, 0, 0.4)",
    zIndex: isHovered ? 1000 : 1,
    filter: isPlayable ? "brightness(1)" : "brightness(0.6) grayscale(0.3)",
    animation: "cardEntrance 0.5s ease-out",
    overflow: "hidden",
  };

  const shimmerStyle = card.hero
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: isHovered ? "shimmer 2s infinite" : "none",
        pointerEvents: "none",
        borderRadius: "12px",
      }
    : null;

  return (
    <div
      style={cardStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {}
      {card.hero && <div style={shimmerStyle} />}

      {}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 2,
        }}
      >
        {}
        {card.power !== null && (
          <div
            style={{
              fontSize: currentSize.fontSize,
              fontWeight: "bold",
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)",
              padding: size === "small" ? "4px 8px" : "6px 12px",
              borderRadius: "8px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              boxShadow:
                "0 4px 8px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              minWidth: size === "small" ? "30px" : "40px",
              textAlign: "center",
              transition: "all 0.3s ease",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          >
            {card.power}
          </div>
        )}

        {}
        {card.ability && (
          <div
            style={{
              fontSize: size === "small" ? "10px" : "12px",
              background:
                "linear-gradient(135deg, rgba(138, 43, 226, 0.9) 0%, rgba(75, 0, 130, 0.9) 100%)",
              padding: size === "small" ? "3px 6px" : "4px 8px",
              borderRadius: "6px",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              textTransform: "uppercase",
              fontWeight: "bold",
              letterSpacing: "0.5px",
              boxShadow: "0 2px 6px rgba(138, 43, 226, 0.6)",
              animation: "glowPulse 2s ease-in-out infinite",
            }}
          >
            {card.ability.replace("_", " ")}
          </div>
        )}
      </div>

      {}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: size === "small" ? "8px" : "15px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {card.hero && (
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 215, 0, 0.95) 0%, rgba(255, 165, 0, 0.95) 100%)",
              padding: size === "small" ? "6px 12px" : "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: size === "small" ? "12px" : "16px",
              letterSpacing: "2px",
              color: "#1a1a1a",
              border: "2px solid rgba(255, 255, 255, 0.8)",
              boxShadow:
                "0 4px 12px rgba(255, 215, 0, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.4)",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              transform: isHovered ? "scale(1.1) rotate(-2deg)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
          >
            ★ HERO ★
          </div>
        )}
      </div>

      {}
      <div
        style={{
          fontSize: size === "small" ? "11px" : "14px",
          fontWeight: "bold",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)",
          padding: size === "small" ? "6px" : "8px",
          borderRadius: "6px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.5)",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)",
          position: "relative",
          zIndex: 2,
          letterSpacing: "0.5px",
        }}
      >
        {card.name}
      </div>

      {}
      {card.hero && (
        <>
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "8px",
              width: "20px",
              height: "20px",
              borderTop: "3px solid gold",
              borderLeft: "3px solid gold",
              borderRadius: "4px 0 0 0",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "20px",
              height: "20px",
              borderTop: "3px solid gold",
              borderRight: "3px solid gold",
              borderRadius: "0 4px 0 0",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              width: "20px",
              height: "20px",
              borderBottom: "3px solid gold",
              borderLeft: "3px solid gold",
              borderRadius: "0 0 0 4px",
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              width: "20px",
              height: "20px",
              borderBottom: "3px solid gold",
              borderRight: "3px solid gold",
              borderRadius: "0 0 4px 0",
              opacity: 0.7,
            }}
          />
        </>
      )}
    </div>
  );
}
