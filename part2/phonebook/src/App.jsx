import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import PhoneBook from './components/PhoneBook'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const changeNewName = (event) => setNewName(event.target.value);
  const changeNewNumber = (event) => setNewNumber(event.target.value);
  const changeFilterName = (event) => setFilterName(event.target.value);
  const addNewPerson = (event) => {
    event.preventDefault(); // prevent default redirection behavior of submitting forms

    if (newName === '' || newNumber === '') { // require both name & number inputs
      alert(`Both name and phone fields are required`);
      return;
    }
    if (persons.find((person) => person.name === newName) !== undefined) { // probably use strict equality for undefined
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({name: newName, number: newNumber, id: (persons.length + 1).toString()}));
    // Empty all input fields:
    setNewName('');
    setNewNumber('');
    setFilterName('');
  }

  const fetchPersons = () => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    })
  }

  useEffect(fetchPersons, []); // fetch persons after initial render only

  return (
    <div>
      <Search filterName={filterName} changeFilterName={changeFilterName}/>
      <PersonForm addNewPerson={addNewPerson} newName={newName} changeNewName={changeNewName} newNumber={newNumber} changeNewNumber={changeNewNumber}/>
      <PhoneBook persons={persons} filterName={filterName}/>
    </div>
  )
}

export default App