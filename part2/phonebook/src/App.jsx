import { useState } from 'react'

const Search = ({filterName, changeFilterName}) => {
  return (
    <div>
      <h2>Filter Phonebook with Name</h2>
      <p>filter show with</p>
      <input value={filterName} onChange={changeFilterName}/>
    </div>
  );
}

const PersonForm = ({addNewPerson, newName, changeNewName, newNumber, changeNewNumber}) => {
  return (
    <div>
      <h2>Add a New Person</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={changeNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNewNumber}/>
        </div>    
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const changeNewName = (event) => setNewName(event.target.value);
  const changeNewNumber = (event) => setNewNumber(event.target.value);
  const changeFilterName = (event) => setFilterName(event.target.value);

  const addNewPerson = (event) => {
    event.preventDefault(); // prevent default redirection behavior of submitting forms

    if (newName === '' || newNumber === '') {
      alert(`Both name and phone fields are required`);
      return;
    }
    if (persons.find((person) => person.name === newName) !== undefined) { // probably use strict equality for undefined
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}));
  }

  return (
    <div>
      <Search filterName={filterName} changeFilterName={changeFilterName}/>
      <PersonForm addNewPerson={addNewPerson} newName={newName} changeNewName={changeNewName} newNumber={newNumber} changeNewNumber={changeNewNumber}/>
      <PhoneBook persons={persons} filterName={filterName}/>
    </div>
  )
}

export default App