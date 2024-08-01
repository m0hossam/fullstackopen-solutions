const CountrySection = ({countryName, capitalName, countryArea, countryLangs, flagSrc, flagAlt}) => {
    return (
        <>
            <h2>{countryName}</h2>
            <p>Capital: {capitalName}</p>
            <p>Area: {countryArea} km<sup>2</sup></p>
            <h4>Languages:</h4>
            <ul>
                {countryLangs.map(lang => 
                <li key={lang}>{lang}</li>)}
            </ul>
            <img src={flagSrc} alt={flagAlt}/>
        </>
    );
}

export default CountrySection