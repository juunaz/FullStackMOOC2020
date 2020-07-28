import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import Numbers from './components/phonebook'

const Filter = (props) => {

  return (
    <div>
      Filter by name: <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const PersonForm  = (props) => {
  return (
    <form onSubmit={props.addNameButtonHandling}>
      <div>
        Name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        Number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>  
      <div>
        <button type="submit">Add to phonebook</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  //Get JSON data
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  // New, filtered array
  const FilteredArray = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addNameButtonHandling = (event) => {
    event.preventDefault()
    addName()
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //Add a new person to the array
  const addName = (event) => {
    const nameObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: persons.length + 1,
    }

    if(persons.some(person => person.name === nameObject.name)){
      alert(`${newName} is already added to phonebook`)
  } else{
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addNameButtonHandling={addNameButtonHandling} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber}/>
      <h2>Numbers:</h2>
      <Numbers FilteredArray={FilteredArray}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} persons={persons}/>
    </div>
  )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'))