import weatherService from "../services/weather";
import { useState, useEffect } from 'react';

const Detail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  console.log('weather es: ', weather);
  console.log('country es: ', country);
  
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    const params = {
      access_key: api_key,
      query: country.capital[0],
    };

    weatherService.getWeather(params)
      .then(response => {
        setWeather(response);
      })
      .catch(error => {
        console.log(error);
      });

  }, [country]);

  if (weather !== null) {
    const currentWeather = weather.current;
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.entries(country.languages).map(([code, language]) => (
            <li key={code}>{language}</li>
          ))}
        </ul>
        <h3>Flag:</h3>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />

        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature: {currentWeather.temperature}° Celsius</p>
        <img src={currentWeather.weather_icons[0]} alt="Weather icon" />
        <p>Wind: {currentWeather.wind_speed} mph, direction: {currentWeather.wind_dir}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <h3>Flag:</h3>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  );
};

export default Detail;
