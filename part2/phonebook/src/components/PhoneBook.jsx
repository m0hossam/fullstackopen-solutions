const PhoneBook = ({persons, filterName, deletePerson}) => {
    const isFiltered = filterName !== '';
    let filteredPersons;
  
    if (isFiltered) {
      filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()));
    }
  
    return (
      <div>
        <h2>The Phonebook</h2>
        <ul>
          {(isFiltered ? filteredPersons : persons).map((person) => <li key={person.id}>
            <span>{person.name} {person.number} </span>
            <button onClick={() => deletePerson(person.id)}>delete</button>
            </li>)}
        </ul>
      </div>
    );
  }

export default PhoneBook