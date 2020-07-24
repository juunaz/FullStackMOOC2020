import React from 'react'
  
const Numbers = ({ persons }) => {
    return (
        <div>
            <ul>
                {persons.map(person =>
                    <li key={person.name}>{person.name}</li>
                    )}
            </ul>
        </div>
    )
}

export default Numbers