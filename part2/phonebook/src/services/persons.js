import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons';

// returns persons array as a promise
const getAllPersons = () => axios.get(baseUrl).then(reponse => reponse.data);

// returns new person object as a promise
const addPerson = (newPerson) => axios.post(baseUrl, newPerson).then(response => response.data)

// returns deleted person object as a promise
const deletePerson = (personId) => axios.delete(`${baseUrl}/${personId}`).then(response => response.data);

// returns updated person object as a promise
const updatePerson = (personId, newPerson) => axios.put(`${baseUrl}/${personId}`, newPerson).then(response => response.data);

// cannot write without curly braces cuz these are promises not functions
export default { getAllPersons, addPerson, deletePerson, updatePerson }