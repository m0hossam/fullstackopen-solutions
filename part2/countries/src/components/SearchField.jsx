const SearchField = ({countryName, changeCountryName}) => {
    return (
        <label>
            Find countries by name:<input value={countryName} onChange={changeCountryName}/>
        </label>
    );
}

export default SearchField