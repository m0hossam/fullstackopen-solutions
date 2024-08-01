import { useState } from 'react'
import weatherService from '../services/weather'
import CountrySection from './CountrySection'
import WeatherSection from './WeatherSection'

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
        let displayWeather = true; // to catch errors gracefully

        if (weather === null) {
            displayWeather = false;
            weatherService.getWeather(country.capital[0])
            .then(weatherResponse => {
                setWeather(weatherResponse);
            })
            .catch(() => console.log('Weather service unavailable.'));
        }

        if (weather !== null) {
            if (weather.name !== country.capital[0]) { // check if we already have the weather state of the current city
                displayWeather = false; //
                weatherService.getWeather(country.capital[0])
                .then(weatherResponse => {
                    setWeather(weatherResponse);
                })
                .catch(() => setWeather(null));
            }
        }

        return (
            <div>
                <CountrySection 
                countryName={country.name.common} 
                capitalName={country.capital[0]} 
                countryArea={country.area} 
                countryLangs={Object.values(country.languages)} 
                flagSrc={country.flags.png} 
                flagAlt={country.flags.alt}/>
                {
                    displayWeather 
                    ?
                    <WeatherSection
                    cityName={country.capital[0]} 
                    temperature={weather.main.temp} 
                    speed={weather.wind.speed} 
                    iconSrc={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/> 
                    : 
                    <p>Weather service is unavailable right now.</p>
                }
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