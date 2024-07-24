const Search = ({filterName, changeFilterName}) => {
    return (
      <div>
        <h2>Filter Phonebook with Name</h2>
        <p>filter show with</p>
        <input value={filterName} onChange={changeFilterName}/>
      </div>
    );
  }

export default Search