const PhoneBook = ({persons, filterName}) => {
    const isFiltered = filterName !== '';
    let filteredPersons;
  
    if (isFiltered) {
      filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()));
    }
  
    return (
      <div>
        <h2>The Phonebook</h2>
        <ul>
          {(isFiltered ? filteredPersons : persons).map((person) => <li key={person.id}>{person.name} {person.number}</li>)}
        </ul>
      </div>
    );
  }

export default PhoneBook