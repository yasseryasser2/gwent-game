import React from "react";
import Row from "./components/Row";
import { northernRealmsCards } from "./data/cards";

function App() {
  // Get some test cards
  const testCards = [
    northernRealmsCards[0], // Geralt (hero, 15 power)
    northernRealmsCards[9], // Spy (5 power)
    northernRealmsCards[20], // Regular unit
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "white" }}>Gwent - Row Test</h1>

      {/* Normal row */}
      <Row
        rowType="melee"
        cards={testCards}
        isPlayerRow={true}
        hasHorn={false}
        weatherActive={false}
      />

      {/* Row with horn */}
      <Row
        rowType="ranged"
        cards={testCards}
        isPlayerRow={true}
        hasHorn={true}
        weatherActive={false}
      />

      {/* Row with weather (should reduce non-heroes to 1) */}
      <Row
        rowType="siege"
        cards={testCards}
        isPlayerRow={false}
        hasHorn={false}
        weatherActive={true}
      />

      {/* Empty row */}
      <Row
        rowType="melee"
        cards={[]}
        isPlayerRow={false}
        hasHorn={false}
        weatherActive={false}
      />
    </div>
  );
}

export default App;
