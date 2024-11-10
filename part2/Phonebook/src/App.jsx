import { useState } from 'react'
import List from './components/List'
import Filter from './components/filter'
import AddName from './components/AddName'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const addNumber = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
    const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    }
  }


  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }


  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter = {handleFilter} />
      <AddName submitHandler = {addNumber} handleName = {handleName} handleNumber = {handleNumber} newName = {newName} newNumber = {newNumber}/>
      <h2>Numbers</h2>
      <List persons = {personsToShow}/>
    </div>
  )
}

export default App

/*
<ul>
        {personsToShow.map(person => 
        <Person key = {person.name} name = {person.name} number = {person.number}/>
        )}
      </ul>
*/