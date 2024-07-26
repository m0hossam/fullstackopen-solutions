import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import PhoneBook from './components/PhoneBook'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const emptyForm = () => {
    // Empty all input fields:
    setNewName('');
    setNewNumber('');
    setFilterName('');
  }

  const changeNewName = (event) => setNewName(event.target.value);
  const changeNewNumber = (event) => setNewNumber(event.target.value);
  const changeFilterName = (event) => setFilterName(event.target.value);
  const addNewPerson = (event) => {
    event.preventDefault(); // prevent default redirection behavior of submitting forms

    if (newName === '' || newNumber === '') { // require both name & number inputs
      alert(`Both name and phone fields are required`);
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson !== undefined) { // probably use strict equality for undefined
      const isUpdateConfirmed = confirm(`'${existingPerson.name}' is already added to the phonebook, do you want to replace the old number with a new one?`);
      if (isUpdateConfirmed) {
        const newPerson = {...existingPerson, number: newNumber};
        personService.updatePerson(newPerson.id, newPerson).then(updatedPerson => {
          setPersons(persons.map(person => (person.id === newPerson.id) ? updatedPerson : person)); // only swap the person whose number is updated
          emptyForm();
        })
      }
      return;
    }

    const newPerson = { // no id because we use POST to create
      name: newName,
      number: newNumber
    };

    personService.addPerson(newPerson).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      emptyForm();
    })
  }

  const deletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name;
    const isDeleteConfirmed = confirm(`Are you sure you want to delete '${personName}'?`);
    if (isDeleteConfirmed) {
      personService.deletePerson(id).then((deletedPerson) => 
      setPersons(persons.filter(person => person.id !== deletedPerson.id)));
    }
  }

  const fetchPersons = () => {
    personService.getAllPersons().then(fetchedPersons => setPersons(fetchedPersons));
  }

  useEffect(fetchPersons, []); // empty dependency array = fetch persons after initial render only

  return (
    <div>
      <Search filterName={filterName} changeFilterName={changeFilterName}/>
      <PersonForm addNewPerson={addNewPerson} newName={newName} changeNewName={changeNewName} newNumber={newNumber} changeNewNumber={changeNewNumber}/>
      <PhoneBook persons={persons} filterName={filterName} deletePerson={deletePerson}/>
    </div>
  )
}

export default App