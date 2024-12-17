import axios from 'axios'
const baseUrl = 'http://api.weatherstack.com/current'

const getWeather = (params) => {
    console.log('request: ',params)
    const request = axios.get(baseUrl, {params})
    console.log(request)
    return request.then(response => response.data)
  }



  export default { 
    getWeather
  }