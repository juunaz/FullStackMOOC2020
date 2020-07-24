import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Numbers from './components/phonebook'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNameButtonHandling = (event) => {
    event.preventDefault()
    addName()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    const nameObject = {
      name: newName,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: persons.length + 1,
    }

    if(persons.some(person => person.name === nameObject.name)){
      alert(`${newName} is already added to phonebook`)
  } else{
      setPersons(persons.concat(nameObject))
      setNewName('')
  }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameButtonHandling}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">Add to phonebook</button> 
        </div>
      </form>
      <h2>Numbers:</h2>
      <Numbers persons={persons}/>
    </div>
  )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'))