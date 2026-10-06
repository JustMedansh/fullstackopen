import { use, useState } from 'react'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

  const handleNoteChange = (event) => {
    const newValue = event.target.value
    console.log(newValue)
    setNewNote(newValue)
  }

  const handleSave = (event) => {
    event.preventDefault()
    const newNoteObject = {
      content: newNote,
      id: String(notes.length + 1),
      important: 0.5 > Math.random()
    }
    console.log('saved \'' + newNoteObject.content + '\'', 'important', newNoteObject.important)
    setNotes(notes.concat(newNoteObject))
    setNewNote('')
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important == true)

  return (
    <div>
      <h1>Notes</h1>

      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={handleSave}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>Toggle Show All</button>
    </div>
  )
}

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

export default App