import Person from './Persons'

const List = ({persons}) => {
    return(
        <ul>
        {persons.map(person => 
        <Person key = {person.name} name = {person.name} number = {person.number}/>
        )}
      </ul>
    )
}

export default List