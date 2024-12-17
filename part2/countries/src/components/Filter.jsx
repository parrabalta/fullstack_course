const Filter = (props) => {
    return(
      <div>
        Find country <input onChange = {props.handleFilter}></input>
      </div>
    )
}


export default Filter