import React from "react";
import Card from "./components/Card";
import { northernRealmsCards } from "./data/cards";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1a1a",
        minHeight: "100vh",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <h1 style={{ color: "white", width: "100%" }}>Gwent Cards Test</h1>

      {/* Test with different cards */}
      <Card
        card={northernRealmsCards[0]}
        onClick={(card) => console.log("Clicked:", card.name)}
      />

      <Card
        card={northernRealmsCards[9]}
        onClick={(card) => console.log("Clicked:", card.name)}
      />

      <Card
        card={northernRealmsCards[20]}
        onClick={(card) => console.log("Clicked:", card.name)}
        isPlayable={false}
      />
    </div>
  );
}

export default App;
