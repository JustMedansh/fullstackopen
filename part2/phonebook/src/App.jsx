import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 , number: '040-1234567'},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const handleNameChange = (event) => {
    const newValue = event.target.value
    console.log(newValue)
    setNewName(newValue)
  }

  const handleNumberChange = (event) => {
    const newValue = event.target.value
    console.log(newValue)
    setNewNumber(newValue)
  }

  const handleFilterChange = (event) => {
    const newValue = event.target.value
    console.log(newValue)
    setFilter(newValue)
  }

  const handleSave = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      id: String(persons.length + 1),
      number: newNumber,
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

  const showAll = !newFilter
  const contactsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} newFilter={newFilter} />
      <PersonForm
        onSubmit={handleSave}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons contacts={contactsToShow} />
    </div>

  )
}

const Filter = ({ onChange, newFilter }) => {
  return (
    <form>
      <div>
        filter shown with: <input onChange={onChange} value={newFilter}/>
      </div>
    </form>
  )
}

const Persons = ({ contacts }) => {
  return (<div>
    {contacts.map(person => <Contact contactObject={person} key={person.id}/>)}
  </div>)
}

const Contact = ({ contactObject }) => {
  return (<p>
    {contactObject.name} {contactObject.number}
  </p>)
}

const PersonForm = (props) => {
  return (<form onSubmit={props.onSubmit}>
    <div>
      name: <input onChange={props.onNameChange} value={props.newName}/>
    </div>
    <div>
      number: <input onChange={props.onNumberChange} value={props.newNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

export default App