import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import PhoneBook from './components/PhoneBook'
import personService from './services/persons'

/* 
NOTE: Since we are updating internal state instead of re-fetching data from the server,
and we are checking for an existing person in the state not the server,
it is possible to add multiple persons with the same name from multiple different browser tabs.
Maybe we will fix this in an upcoming part?
*/

const App = () => {
  const [notification, setNotification] = useState(null);
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

  const updatePerson = (existingPerson) => {
    const isUpdateConfirmed = confirm(`'${existingPerson.name}' is already added to the phonebook, do you want to replace the old number with a new one?`);
    if (isUpdateConfirmed) {
      const newPerson = {...existingPerson, number: newNumber};
      
      personService.updatePerson(newPerson.id, newPerson)
      
      .then(updatedPerson => {
        setPersons(persons.map(person => (person.id === newPerson.id) ? updatedPerson : person)); // only swap the person whose number is updated
        emptyForm();
        const successNotification = {
          message: `Updated the info of '${updatedPerson.name}' successfully.`,
          isError: false
        };
        setNotification(successNotification);
        setTimeout(() => setNotification(null), 5000);
      })
      
      .catch(() => {
        setPersons(persons.filter(person => person.id !== existingPerson.id));
        const errorNotification = {
          message: `'${existingPerson.name}' has already been removed from the phonebook.`,
          isError: true
        };
        setNotification(errorNotification);
        setTimeout(() => setNotification(null), 5000);
      });
    }
  }

  const addNewPerson = (event) => {
    event.preventDefault(); // prevent default redirection behavior of submitting forms

    if (newName === '' || newNumber === '') { // require both name & number inputs
      const errorNotification = {
        message: 'Both name and phone fields are required.',
        isError: true
      };
      setNotification(errorNotification);
      setTimeout(() => setNotification(null), 5000);
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName); // update phone number if name exists
    if (existingPerson !== undefined) { // probably use strict equality for undefined
      updatePerson(existingPerson);
      return;
    }

    const newPerson = { // no id because we use POST to create
      name: newName,
      number: newNumber
    };
    personService.addPerson(newPerson).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      emptyForm();
      const successNotification = {
        message: `Added '${createdPerson.name}' to the phonebook successfully.`,
        isError: false
      };
      setNotification(successNotification);
      setTimeout(() => setNotification(null), 5000);
    })
  }

  const deletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name;
    const isDeleteConfirmed = confirm(`Are you sure you want to delete '${personName}'?`);
    if (isDeleteConfirmed) {
      
      personService.deletePerson(id)

      .then((deletedPerson) => {
        setPersons(persons.filter(person => person.id !== id));
        const successNotification = {
          message: `Deleted '${personName}' from the phonebook successfully.`,
          isError: false
        };
        setNotification(successNotification);
        setTimeout(() => setNotification(null), 5000);
      })
      
      .catch(() => {
        setPersons(persons.filter(person => person.id !== id));
        const errorNotification = {
          message: `'${personName}' has already been removed from the phonebook.`,
          isError: true
        };
        setNotification(errorNotification);
        setTimeout(() => setNotification(null), 5000);
      });
    }
  }

  const fetchPersons = () => {
    personService.getAllPersons().then(fetchedPersons => setPersons(fetchedPersons));
  }

  useEffect(fetchPersons, []); // empty dependency array = fetch persons after initial render only

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification}/>
      <Search filterName={filterName} changeFilterName={changeFilterName}/>
      <PersonForm addNewPerson={addNewPerson} newName={newName} changeNewName={changeNewName} newNumber={newNumber} changeNewNumber={changeNewNumber}/>
      <PhoneBook persons={persons} filterName={filterName} deletePerson={deletePerson}/>
    </div>
  )
}

export default App