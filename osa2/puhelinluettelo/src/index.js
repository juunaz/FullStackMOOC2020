import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Numbers from './components/numbers'
import serverService from './components/server'
import Notification from './components/notification'
import './index.css'

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
  const [ Message, setMessage ] = useState(null)

  //Get JSON data
  useEffect(() => {
    console.log('effect')
    serverService
      .getAll()
      .then(response => {
        setPersons(response)
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
  
  const delPerson= (id) => {
    const personsName = persons
                          .filter(person => person.id === id)
                            .map(person => person.name)
    if (window.confirm(`Are you sure you want to delete ${personsName} ?`)) {
      serverService
        .del(id)
          .then(
            setPersons(persons.filter(person => person.id !== id))
          )
          setMessage(`${personsName} was deleted`)
          setTimeout(() => {
            setMessage(null)
          }, 3500)
    }
    else {
      console.log(`${personsName} was not deleted`)
    }
  }

  //Add a new person to the array
  const addName = (event) => {
    const nameObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    if(persons.some(person => person.name === nameObject.name)){
      // alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${newName} is already added to phonebook, want to replace it with this new number?`)) {
        const previousPerson = persons.find(n => n.name === newName);
        serverService
        .replace(previousPerson.id, { ...previousPerson, number: newNumber })
        .then(response => {
          setPersons(
            persons.map(n => (n.name === newName ? response : n))
          )
        })
        .catch(error => {
          setMessage(`Note '${newName}' was already removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 3500)
        })
        setMessage(`${newName} was replaced`)
        setTimeout(() => {
          setMessage(null)
        }, 3500)
      } 
  } else{
      serverService
        .create(nameObject)
        .then(response => {
        setPersons(persons.concat(response))
        setMessage(`${nameObject.name} was added to the Phonebook`)
        setTimeout(() => {
          setMessage(null)
        }, 3500)
        setNewName('')
        setNewNumber('')
    })  
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} />
      <PersonForm addNameButtonHandling={addNameButtonHandling} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber}/>
      <h2>Numbers:</h2>
      <Numbers FilteredArray={FilteredArray} delPerson={delPerson}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} persons={persons}/>
    </div>
  )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'))