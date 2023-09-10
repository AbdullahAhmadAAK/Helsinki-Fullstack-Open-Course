import { useState, useEffect} from 'react'
import axios from 'axios'

function App2() {

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState('')
  const [showWeather, setShowWeather] = useState(false)
  const [weatherDetails, setWeatherDetails] = useState([])
  const [loading, setLoading] = useState(false)

  const handleCountryChange = (event) => {
    setCountryFilter(event.target.value)
    console.log(event.target.value)
    setShowWeather(false)
  }

  const searchCountries = () => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const FilteredCountries = response.data
        .filter(country => 
          country.name.common.toLowerCase().includes(countryFilter.toLowerCase()) || 
          country.name.official.toLowerCase().includes(countryFilter.toLowerCase())  
        )

        // console.log('response of searchCOuntries', FilteredCountries)

        setCountries(FilteredCountries)

      })
      .catch(error => {
        console.log('error:', error)
      })
  }

  const getWeather = () => {
    console.log('gonna try to get weather')
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: {q: countryFilter},
      headers: {
        'X-RapidAPI-Key': '62b1eab6ddmsh901e2fb3d7df102p1a8884jsn1c82e8127c80',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    }

    setLoading(true)
    console.log('in the try block')
    const request = axios.request(options)
    request
      .then(response => {
        console.log(response.data)
        setWeatherDetails(response.data.current)
        setLoading(false)

      })
      .catch(error => {
        console.log(error)
      })
    
  }
  useEffect(searchCountries, [ countryFilter ])

  useEffect( () => {
    if(showWeather) {
      getWeather()
    }
  }, [])

  let index = 1

  if(countries.length > 10) {
    return (
      <>
        <span>find countries</span>
        <input type="text" value={countryFilter} onChange={handleCountryChange}/>
        <p>Too many matches, specify another filter</p>
      </>
    )
  }

  else if (countries.length === 1) {

    console.log('reached 1 country block, this is problematic block: if i remove if(weatherDetails &&...), infinite rerenders.if i dont, .text undefined.')

    const ourCountry = countries[0]
    setShowWeather(true)

    if(weatherDetails && loading === false) {
      return (
        <>
          <span>find countries</span>
          <input type="text" value={countryFilter} onChange={handleCountryChange}/>
          
          <h1>{ourCountry.name.common}</h1>
  
          <p>capital {ourCountry.capital}</p>
          <p>area {ourCountry.area}</p>
  
          <h4>languages:</h4>
          <ul>
          {Object.entries(ourCountry.languages).map(([key, value]) => (
            <li key={key}>
              {value}
            </li>
          ))}
          </ul>
  
          <img src={ourCountry.flags.png} />
  
          
          <h2>Weather in Helsinki</h2>
          <p>weather right now is {weatherDetails.condition.text}</p>
          <p>temperature {weatherDetails.temp_c} Celsius</p>
          <p>wind {weatherDetails.wind_kph} kph/s</p>
  
        </>
      )
    
    }
  }

  return (
    <>
      <span>find countries</span>
      <input type="text" value={countryFilter} onChange={handleCountryChange}/>
      <br />

      {
        countries.map(country => {

          const handleShowClick = () => {
            setShowCountry(country.name.common)
          }
          if(country.name.common === showCountry) {
            return (
              <>
                <span key={index++}>{country.name.common}</span>

                <p>capital {country.capital}</p>
                <p>area {country.area}</p>

                <h4>languages:</h4>
                <ul>
                {Object.entries(country.languages).map(([key, value]) => (
                  <li key={key}>
                    {value}
                  </li>
                ))}
                </ul>

                <img src={country.flags.png} />
                <br />
                
              </>
            )
          }
          else {
            return ( 
              <>
                <span key={index++}>{country.name.common}</span>
                <button onClick={handleShowClick}>show</button>
                <br />
              </>
            )
          }
          
        })
      }

      {}

    </>
  )
}

export default App2
