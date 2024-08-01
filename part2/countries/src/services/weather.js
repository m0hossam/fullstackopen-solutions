import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY

const getWeather = (cityName) =>
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`)
    .then(response => response.data);

export default {getWeather}