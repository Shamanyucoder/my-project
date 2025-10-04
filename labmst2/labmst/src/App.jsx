import React, { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const players = [
    { id: 1, name: "Mahivardhan", role: "Batsman" },
    { id: 2, name: "kasi", role: "Batsman" },
    { id: 3, name: "samanyu", role: "All-Rounder" },
    { id: 4, name: "Jasprit Bumrah", role: "Bowler" },
    { id: 5, name: "Ravindra Jadeja", role: "All-Rounder" },
  ];

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Player List</h1>
      <input
        type="text"
        placeholder="Search player by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="player-list">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <div key={player.id} className="player-card">
              <h2>{player.name}</h2>
              <p>{player.role}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No players found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
