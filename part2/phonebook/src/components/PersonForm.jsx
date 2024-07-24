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

export default PersonForm