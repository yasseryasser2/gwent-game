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
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, rgba(26, 26, 46, 0.95) 0%, rgba(15, 12, 41, 0.95) 100%)",
        border: "3px solid rgba(139, 115, 85, 0.6)",
        borderRadius: "12px",
        padding: "15px",
        boxShadow:
          "0 10px 40px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(0, 0, 0, 0.3)",
        overflow: "visible",
      }}
    >
      {}
      <div
        style={{
          textAlign: "center",
          padding: "8px",
          background: "rgba(255, 107, 107, 0.15)",
          borderRadius: "8px",
          marginBottom: "10px",
          border: "2px solid rgba(255, 107, 107, 0.3)",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#ff6b6b",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          OPPONENT: {opponentScore}
        </div>
      </div>

      {}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "15px",
        }}
      >
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

      {}
      <div
        style={{
          textAlign: "center",
          padding: "12px",
          background:
            "linear-gradient(90deg, rgba(139, 115, 85, 0.3) 0%, rgba(139, 115, 85, 0.6) 50%, rgba(139, 115, 85, 0.3) 100%)",
          borderTop: "2px solid rgba(255, 215, 0, 0.4)",
          borderBottom: "2px solid rgba(255, 215, 0, 0.4)",
          margin: "10px 0",
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#ffd700",
            letterSpacing: "3px",
            textShadow: "0 0 10px rgba(255, 215, 0, 0.8)",
          }}
        >
          ⚔️ BATTLEFIELD ⚔️
        </div>
      </div>

      {}
      <div
        style={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "15px",
        }}
      >
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

      {}
      <div
        style={{
          textAlign: "center",
          padding: "8px",
          background: "rgba(81, 207, 102, 0.15)",
          borderRadius: "8px",
          marginTop: "10px",
          border: "2px solid rgba(81, 207, 102, 0.3)",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#51cf66",
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          PLAYER: {playerScore}
        </div>
      </div>
    </div>
  );
}
