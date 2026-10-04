import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    const newValue = event.target.value
    console.log(newValue)
    setNewName(newValue)
  }

  const handleNameSave = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      id: String(persons.length + 1),
    }

    const isPresent = doesExist(newName)
    console.log(isPresent)

    if (isPresent) {
      alert(`${newContact.name} is already added to the phonebook.`)
      return
    }

    console.log('setting', newContact)
    setPersons(persons.concat(newContact))
    setNewName('')
  }

  const doesExist = (personName) => {
    const isPresent = persons.some(person => personName === person.name)
    return isPresent
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNameSave}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <Contact contactObject={person} key={person.id}/>)}
      </div>
    </div>
  )
}

const Contact = ({ contactObject }) => {
  return (<p>
    {contactObject.name}
  </p>)
}

export default App