import { useEffect, useState } from 'react'
import personService from './persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import CustomNotification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response)
    })
    .catch(response => {
      notify("failed to get contacts", 'error')
    })
  }, [])

  useEffect(() => {
    if (notification == null) {
      return
    }

    const timeoutId = setTimeout(() => {setNotification(null)}, 5000)

    return () => {
      clearTimeout(timeoutId)
    }

  }, [notification])

  const notify = (message, type) => {
    setNotification({message, type})
  }

  const handleEvent = (event, setter) => {
    const newValue = event.target.value
    setter(newValue)
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
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
          notify(`changed phone number of ${response.name}`, 'success')
          clearForm()
        })
        .catch(() => {
          notify('failed to update phone number', 'error')
        })

        return
      }
    }

    console.log('setting', newContact)

    personService
    .create(newContact)
    .then(response => {
      setPersons(persons.concat(response))
      clearForm()
      notify(`added ${response.name}`, 'success')
    })
    .catch(
      notify(`failed to add ${response.name}`, 'error')
    )
    
  }

  const doesExist = (personName) => {
    const isPresent = persons.find(person => personName === person.name)
    return isPresent
  }

  const handleDelete = (id) => {
    if (window.confirm("Delete user?")) {
      personService.deleteUser(id)
      .then(response => {
        notify(`deleted ${response.name}`, 'success')
      })
      .catch(response => {
        notify('failed to delete', 'error')
      })
      const newPersons = persons.filter(person => person.id != id)
      setPersons(newPersons)
    }
  }

  const showAll = !newFilter
  const contactsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <CustomNotification message={notification?.message ?? null} type={notification?.type ?? null} />
      <Filter onChange={event => handleEvent(event, setFilter)} newFilter={newFilter} />
      <PersonForm
        onSubmit={handleSave}
        onNameChange={event => handleEvent(event, setNewName)}
        onNumberChange={event => handleEvent(event, setNewNumber)}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons contacts={contactsToShow} onDelete={handleDelete}/>
    </div>
  )
}

export default App