import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')

    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const handleNoteChange = (event) => {
    const newValue = event.target.value
    console.log(newValue)
    setNewNote(newValue)
  }

  const handleSave = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')  
        console.log(response)  
    })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>

      <Notes notes={notesToShow} />

      <NoteForm
        newNote={newNote}
        onNoteChange={handleNoteChange}
        onSubmit={handleSave}
      />

      <button onClick={() => setShowAll(!showAll)}>
        Toggle Show All
      </button>
    </div>
  )
}

const Notes = ({ notes }) => {
  return (
    <ul>
      {notes.map(note =>
        <Note key={note.id} note={note} />
      )}
    </ul>
  )
}

const Note = ({ note }) => {
  return (
    <li>{note.content}</li>
  )
}

const NoteForm = ({ newNote, onNoteChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        value={newNote}
        onChange={onNoteChange}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default App