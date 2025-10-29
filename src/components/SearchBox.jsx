import React from "react";

function SearchBox({ city, setCity, getWeather }) {
  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
    </div>
  );
}

export default SearchBox;
