import { useState, useEffect } from 'react';
import './App.css';
import countriesService from './services/countries'; 
import List from './components/List';
import Filter from './components/Filter';



function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([])


  useEffect(() => {
    countriesService
      .getAll() 
      .then(initialCountries => {
        setCountriesList(initialCountries);
        console.log(initialCountries)
      });
  }, []);


  const handleFilter = (event) => {
    const newList = countriesList.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    console.log(newList)
    setCountriesToShow(newList)

  };

  


  return (
    <div>
      <h2>Countries</h2>
      <Filter handleFilter={handleFilter} />
      <List countries={countriesToShow} setCountriesToShow = {setCountriesToShow} />
    </div>
  );
}

export default App;
