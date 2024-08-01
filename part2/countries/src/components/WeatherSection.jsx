const WeatherSection = ({cityName, temperature, speed, iconSrc}) => {
    return (
        <>
            <h4>Weather in {cityName}:</h4>
            <p>Temperature: {temperature} Celcius</p>
            <img src={iconSrc} alt="weather icon"/>
            <p>Wind: {speed} m/s</p>
        </>
    );
}

export default WeatherSection