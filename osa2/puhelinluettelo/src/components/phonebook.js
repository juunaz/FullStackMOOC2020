import React from 'react'

const Numbers = ({ FilteredArray }) => {
    return (
        <div>
            <ul>
                {FilteredArray.map(person =>
                    <li key={person.name}>{person.name}</li>
                    )}
            </ul>
        </div>
    )
}

export default Numbers