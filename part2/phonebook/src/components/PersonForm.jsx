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

export default PersonForm