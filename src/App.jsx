import React from "react";
import Hand from "./components/Hand";
import { getAllCards } from "./data/cards";

function App() {
  const allCards = getAllCards(); // Get cards with duplicates

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center" }}>Gwent - Hand Test</h1>

      {/* Test with 10 cards */}
      <Hand
        cards={allCards.slice(0, 10)}
        onCardClick={(card) => console.log("Played:", card.name)}
        isPlayerTurn={true}
      />

      {/* Test with disabled hand */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ color: "white" }}>Opponent's Turn (cards disabled):</h2>
        <Hand
          cards={allCards.slice(10, 15)}
          onCardClick={(card) => console.log("Cant play:", card.name)}
          isPlayerTurn={false}
        />
      </div>
    </div>
  );
}

export default App;
