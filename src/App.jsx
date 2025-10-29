import React, { useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  
  // State variables
  const [city, setCity] = useState(""); // to store city name 
  const [weather, setWeather] = useState(null); // to store weather info
  const [error, setError] = useState("");  // to store error data

  const getWeather = async () => {   // arrow function to get weather info using api

    if (!city) {  // null value error
      setError("Please enter a city name");
      return;
    }

    // Exception Handling
    try {
      
      // resetting previous states 
      setError("");
      setWeather(null);

      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`); // fetching data using city name
      const geoData = await geoRes.json();// converting the response to json
      //console.log("Geodata = ",geoData)

      if (!geoData.results || geoData.results.length === 0) { // no matching error
        setError("City not found");
        return;
      }

      const { latitude, longitude } = geoData.results[0]; // assigning the lat & long data from "geo" response
      
      // fetching weather data based on lat and long
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherData = await weatherRes.json(); // converting the response to json
      
      // console.log("Weather data = ", weatherData)

      setWeather(weatherData.current_weather); // setting the weather_data to the state from the response obj 
    } catch {
      setError("Error fetching data"); // If there is an error then the state of error_data is set
    }
  };

  return (
    <div className="container">
      <h1>Weather Now</h1>

      <SearchBox city={city} setCity={setCity} getWeather={getWeather} />

      {error && <ErrorMessage message={error} />}

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
