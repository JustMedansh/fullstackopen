import ReactDOM from 'react-dom/client'
import App from './App'

const notes = [
  {
    content: 'Hi!',
    id: 1,
    important: true,
  },
  {
    content: 'How are you?',
    id: 2,
    important: false,
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)