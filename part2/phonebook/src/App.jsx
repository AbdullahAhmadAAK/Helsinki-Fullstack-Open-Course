import { useState, useEffect } from 'react'
import './App.css'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService
      .getContacts()
      .then(persons => setPersons(persons))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const handleDeleteClick = (personToDelete) => {

    var usersConfirmed = window.confirm(`Are you sure you want to delete ${personToDelete.name} from your phonebook?`)

    if(usersConfirmed) {
      personsService
        .deleteContact(personToDelete.id)
        .then(() => {
            const filteredListPersons = persons.filter(person => person.id !== personToDelete.id)
            setPersons(filteredListPersons)
        })
    }
}

  const addPerson = (event) => {
    event.preventDefault()

    const matchingNameFound = persons.find((person) => person.name === newName)
    const matchingNumberFound = persons.find((person) => person.number === newNumber)
    
    if(matchingNameFound && matchingNumberFound) {
        alert(`${newName} and ${newNumber} is already added to phonebook`)
    }
    else if(matchingNameFound) {


      var userConfirmed = window.confirm(`${matchingNameFound.name} is already added to the phone book, want to replace old number with new number?`)

      if(userConfirmed) {

        const updatedPersonObj = { // create person obj
          name: newName,
          number: newNumber,
          id: matchingNameFound.id
        }

        personsService
          .updateContact(updatedPersonObj)
          .then(updatedPerson => {

            const newPersonsList = persons.map(person => {
              if(person.id === updatedPerson.id) {
                return updatedPerson
              }
              else {
                return person
              }
            })
            setPersons(newPersonsList)
            setNotificationMessage(`Updated ${updatedPerson.name}`)
            setNotificationType(`success`)
            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 4000);

          })
          .catch(error => {
            setNotificationMessage(`Information of ${updatedPersonObj.name} has already been removed from server`)
            setNotificationType('error')

            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 4000);
          })


        
      }
        
          
          
    }
    else if(matchingNumberFound) {
        alert(`${newNumber} is already added to phonebook`)
    }
    else {

      const largestId = persons.reduce((accumulator, currentValue) => {
        if(currentValue.id > accumulator) {
          return currentValue.id
        }
        else {
          return accumulator
        } 
      }, 0)

        const newPersonObj = { // create person obj
            name: newName,
            number: newNumber,
            id: largestId+1
        }

         // set personArray locally
        personsService
          .addContact(newPersonObj) // send to server too
          .then(newPerson => {
            // setPersons([...persons, newPersonObj])
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Added ${newPerson.name}`)
            setNotificationType(`success`)

            setTimeout(() => {
              setNotificationMessage(null)
              setNotificationType(null)
            }, 4000);
          })
        
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      <h2>Search Phonebook by Name</h2>
      <Filter 
        searchFilter={searchFilter} handleFilterChange={handleFilterChange}></Filter>

      <h2>Add New Person to Phonebook</h2>
      <Notification message={notificationMessage} msgType={notificationType}></Notification>
      <PersonForm
        addPerson={addPerson} 
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}></PersonForm>

      <h2>Numbers</h2>
      <Persons
        persons={persons} searchFilter={searchFilter} handleDeleteClick={handleDeleteClick}></Persons>
    </div>
  )
}

export default App