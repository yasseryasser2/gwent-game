import React from "react";
import Row from "./Row";
import { ROWS } from "../data/constants";

export default function Board({
  playerRows,
  opponentRows,
  playerScore,
  opponentScore,
  weatherEffects,
  hornEffects,
}) {
  return (
    <div
      style={{
        backgroundColor: "#0d1117",
        padding: "20px",
        border: "3px solid #8b7355",
        borderRadius: "10px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Opponent Score Display */}
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#ff6b6b",
          textAlign: "center",
          padding: "15px",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        OPPONENT: {opponentScore}
      </div>

      {/* Opponent's Rows (siege, ranged, melee - top to bottom) */}
      <div className="opponent-section">
        <Row
          rowType={ROWS.SIEGE}
          cards={opponentRows.siege}
          isPlayerRow={false}
          hasHorn={hornEffects.opponent.siege}
          weatherActive={weatherEffects.siege}
        />
        <Row
          rowType={ROWS.RANGED}
          cards={opponentRows.ranged}
          isPlayerRow={false}
          hasHorn={hornEffects.opponent.ranged}
          weatherActive={weatherEffects.ranged}
        />
        <Row
          rowType={ROWS.MELEE}
          cards={opponentRows.melee}
          isPlayerRow={false}
          hasHorn={hornEffects.opponent.melee}
          weatherActive={weatherEffects.melee}
        />
      </div>

      {/* Middle Divider */}
      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#ffcc00",
          padding: "20px",
          borderTop: "2px solid #666",
          borderBottom: "2px solid #666",
          background: "rgba(139, 115, 85, 0.2)",
          margin: "10px 0",
        }}
      >
        ⚔️ BATTLEFIELD ⚔️
      </div>

      {/* Player's Rows (melee, ranged, siege - top to bottom) */}
      <div className="player-section">
        <Row
          rowType={ROWS.MELEE}
          cards={playerRows.melee}
          isPlayerRow={true}
          hasHorn={hornEffects.player.melee}
          weatherActive={weatherEffects.melee}
        />
        <Row
          rowType={ROWS.RANGED}
          cards={playerRows.ranged}
          isPlayerRow={true}
          hasHorn={hornEffects.player.ranged}
          weatherActive={weatherEffects.ranged}
        />
        <Row
          rowType={ROWS.SIEGE}
          cards={playerRows.siege}
          isPlayerRow={true}
          hasHorn={hornEffects.player.siege}
          weatherActive={weatherEffects.siege}
        />
      </div>

      {/* Player Score Display */}
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#51cf66",
          textAlign: "center",
          padding: "15px",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "8px",
          marginTop: "10px",
        }}
      >
        PLAYER: {playerScore}
      </div>
    </div>
  );
}
