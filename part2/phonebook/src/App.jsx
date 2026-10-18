import { useEffect, useState } from 'react'
import personService from './persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  }, [])

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
      number: newNumber,
    }

    const isPresent = doesExist(newName)              
    console.log(isPresent)

    if (isPresent) {
      if (window.confirm(`${newContact.name} is already added to the phonebook, replace old number with new one?`)) {
        personService
        .update(isPresent.id, newContact)
        .then(response => {
          const newPersons = persons.map(person => person.id == response.id ? response : person)
          setPersons(newPersons) 
          setNewName('')
          setNewNumber('')
        })

        return
      }
    }

    console.log('setting', newContact)

    personService
    .create(newContact)
    .then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
    })
    
  }

  const doesExist = (personName) => {
    const isPresent = persons.find(person => personName === person.name)
    return isPresent
  }

  const handleDelete = (id) => {
    if (window.confirm("Delete user?")) {
      personService.deleteUser(id)
      const newPersons = persons.filter(person => person.id != id)
      setPersons(newPersons)
    }
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
      <Persons contacts={contactsToShow} onDelete={handleDelete}/>
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

const Persons = ({ contacts, onDelete}) => {
  return (<div>
    {contacts.map(person => <Contact contactObject={person} key={person.id} onDelete={onDelete}/>)}
  </div>)
}

const Contact = ({ contactObject, onDelete }) => {
  return (<p>
    {contactObject.name} {contactObject.number}
    <button onClick={() => {onDelete(contactObject.id)}}>delete</button>
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