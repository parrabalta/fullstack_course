const Filter = (props) => {
    return(
      <div>
        search <input onChange = {props.handleFilter}></input>
      </div>
    )
}


export default Filter