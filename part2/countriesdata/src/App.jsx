import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

function WeatherApp() {

  const [countryDetails, setCountryDetails] = useState([]) // country details will be put here once filtered
  const [weatherDetails, setWeatherDetails] = useState(null) // weather details will be put here
  const [searchInput, setSearchInput] = useState('')

  // this will fetch data of all countries on start of app
  useEffect(() => {
    
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        // filter response.data with whatever is in searchInput

        const allCountries = response.data
        const filteredCountries = allCountries.filter(country => 
          country.name.common.toLowerCase().includes(searchInput.toLowerCase()) || 
          country.name.official.toLowerCase().includes(searchInput.toLowerCase()) 
        )
        setCountryDetails(filteredCountries)
      })
      .catch(error => {
        console.log(error)
      })

    if(searchInput != '') {
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: searchInput},
        headers: {
          'X-RapidAPI-Key': '62b1eab6ddmsh901e2fb3d7df102p1a8884jsn1c82e8127c80',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      }
      axios.request(options)
        .then(response => {
          setWeatherDetails(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    
  }, [searchInput])

  const handleInputChange = (event) => {
    setSearchInput(event.target.value)
    console.log("search by", event.target.value)
  }

  let countries_idx = 1


  if(countryDetails.length > 10) {
    return (
      <div>
        <h1>Countries Data Fetcher (Basic + Weather)</h1>
        <input 
        type="text"
        placeholder='country name'
        value={searchInput}
        onChange={handleInputChange} />
        <p>too many countries being returned, make more specific query</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Countries Data Fetcher (Basic + Weather)</h1>
      <input 
      type="text"
      placeholder='country name'
      value={searchInput}
      onChange={handleInputChange} />

      <h4>Country Details</h4>

      { countryDetails && (
        countryDetails.map(country => {
          
          console.log(country.languages)

          return (
            <div key={countries_idx++}>
              <h4>{country.name.common}</h4>
              <p>capital = {country.capital}</p>
              <p>area = {country.area} </p>
              <h5>languages: </h5>
              <ol>
                {/* {country.languages.forEach(language => {
                  return <p>language</p>
                })} */}
              </ol>
            </div>
          )
        })
      )}

      { weatherDetails && (
        <p>current temperature = {weatherDetails.current.temp_c}</p>
      )}

    </div>
  )
}

export default WeatherApp;
