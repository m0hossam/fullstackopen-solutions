const CountriesList = ({countries, countryName}) => {
    if (countries.length === 0 || countryName === '') {
        return null;
    }

    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(countryName.toLowerCase()));

    if (filteredCountries.length > 10) {
        return <p>Too many matches! Specify another filter.</p>
    }

    if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
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
            </div>
        );
    }

    return (
        <ul>
            {filteredCountries.map(c => 
                <li key={c.cca2}>
                    {c.name.common}
                </li>
            )}
        </ul>
    );
}

export default CountriesList