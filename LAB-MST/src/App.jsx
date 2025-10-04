import React, { useState } from "react";
import "./App.css";

function App() {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [destinations, setDestinations] = useState([]);

  const handleAdd = () => {
    if (place.trim() === "" || country.trim() === "") return;
    const newDestination = {
      id: Date.now(),
      place,
      country,
    };
    setDestinations([...destinations, newDestination]);
    setPlace("");
    setCountry("");
  };

  const handleDelete = (id) => {
    setDestinations(destinations.filter((dest) => dest.id !== id));
  };

  return (
    <div className="container">
      <h1>Destination List</h1>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {destinations.map((dest) => (
          <li key={dest.id} className="list-item">
            <span>
              {dest.place} - {dest.country}
            </span>
            <button className="delete-btn" onClick={() => handleDelete(dest.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
