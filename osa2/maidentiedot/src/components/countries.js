import React from 'react'

const SpecificCountry = ({ name, capital, population, languages, flag }) => {
    return (
      <div>
          <h1>{name}</h1>
          <p>Capital: {capital}</p>
          <p>Population: {population}</p>
          <h2>Languages</h2>
          <ul>
            {languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
          </ul>
          <img src={flag} alt="Flag not found." width="200" height="100" />
      </div>
    )
  }
  

const Countries = ({ FilteredArray, handleShowChange }) => {

    if (FilteredArray.length > 10) {
      return  (
        <div>
          Too many matches, specify another filter.
        </div>
      )
    }
    else if (FilteredArray.length === 1) {
      const {name, capital, population, languages, flag} = FilteredArray[0]
      return (
        <div>
          <SpecificCountry name={name} capital={capital} population={population} languages={languages} flag={flag}/>
        </div>
      ) 
    }
    else {
      return (
        <div>
            <ul>
                {FilteredArray.map(country =>
                    <li key={country.name}>{country.name}
                    <button onChange={handleShowChange}>Show</button>
                    </li>
                    )}
            </ul>
        </div>
    )
    } 
  }

  export default Countries