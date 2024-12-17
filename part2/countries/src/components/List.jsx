import Detail from './Detail'

const List = ({ countries, setCountriesToShow }) => {
    


  if (countries.length > 10) {
      return 'Too many matches, please be more specific.';
  } 
  
  else if (countries.length > 1 && countries.length <= 10) {
      return (
          <ul>
              {countries.map(country => (
                  <li key={country.name.common}>
                      {country.name.common} 
                      <button onClick={() => setCountriesToShow([country])}>show</button>
                  </li>
              ))}
          </ul>
      );
  } 
  

  else if (countries.length === 1) {
     const country = countries[0]
    return <Detail country = {country}/>
  }


  return null;
};

export default List;


