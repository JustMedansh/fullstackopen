const Filter = ({ onChange, newFilter }) => {
  return (
    <form>
      <div>
        filter shown with: <input onChange={onChange} value={newFilter}/>
      </div>
    </form>
  )
}

export default Filter