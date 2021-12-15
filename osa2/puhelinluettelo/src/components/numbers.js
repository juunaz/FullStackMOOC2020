import React from 'react'
import '../index.css'

const Numbers = ({ FilteredArray, delPerson }) => {
    return (
        <div>
            <ul>
                {FilteredArray.map(person =>
                    <li key={person.name}>{person.name}: {person.number}
                    <button onClick={() => delPerson(person.id)}>Delete</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Numbers