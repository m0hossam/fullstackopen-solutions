import { useState } from 'react';
import weatherService from '../services/weather'

const CountriesList = ({countries, countryName, showCountry}) => {
    const [weather, setWeather] = useState(null);

    if (countries.length === 0 || countryName === '') {
        return null;
    }

    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(countryName.toLowerCase()));

    if (filteredCountries.length > 10) {
        return <p>Too many matches! Specify another filter.</p>
    }

    if (filteredCountries.length === 1) {
        const country = filteredCountries[0];

        if (weather === null) {
            weatherService.getWeather(country.capital[0])
            .then(weatherResponse => {
                setWeather(weatherResponse);
            })
            .catch((error) => console.log(error));
            return null; // weather state has not been initialized yet
        }

        if (weather !== null) {
            if (weather.name !== country.capital[0]) { // check if we already have the weather state of the current city
                weatherService.getWeather(country.capital[0])
                .then(weatherResponse => {
                    setWeather(weatherResponse);
                })
                .catch((error) => console.log(error));
            }
        }

        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital[0]}</p>
                <p>Area: {country.area} km<sup>2</sup></p>
                <h4>Languages:</h4>
                <ul>
                    {Object.values(country.languages).map(lang => 
                    <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}/>
                <h4>Weather in {country.capital[0]}:</h4>
                <p>Temperature: {weather.main.temp} Celcius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>
        );
    }

    return (
        <ul>
            {filteredCountries.map(c => 
                <li key={c.cca2}>
                    {c.name.common} 
                    <button onClick={() => showCountry(c.name.common)}>Show</button>
                </li>
            )}
        </ul>
    );
}

export default CountriesList