import { useState, useEffect } from "react"
import countriesService from './services/countries'
import SearchField from "./components/SearchField";
import CountriesList from "./components/CountriesList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('');

  const changeCountryName = (event) => setCountryName(event.target.value);
  
  useEffect(() => {
    countriesService.getAllCountries().then((initialCountries) => setCountries(initialCountries));
  }, []);

  return (
    <div>
      <SearchField countryName={countryName} changeCountryName={changeCountryName}/>
      <CountriesList countries={countries} countryName={countryName}/>
    </div>
  )
}

export default App
