import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';
import Countries from './components/countries'

const Filter = (props) => {

  return (
    <div>
      Filter by name: <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const FilteredArray = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries FilteredArray={FilteredArray} setNewFilter={setNewFilter}/>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))