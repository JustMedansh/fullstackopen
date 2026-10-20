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

export default Persons