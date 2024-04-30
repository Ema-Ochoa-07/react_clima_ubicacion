import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import WeaterCards from './components/WeaterCards'
import Error404 from './components/Error404'
import Loader from './components/Loader'

function App() {

const [coords, setCoords] = useState()
const [weather, setWeather] = useState()
const [temp, setTemp] = useState()
const [isLoading, setIsLoading] = useState(true)
const [hasError, setHasError] = useState(false)
const [showMessagge, setshowMessagge] = useState(false)

  useEffect(()=>{ 

  setTimeout(() => {
    setshowMessagge(true)
  }, 3000)

  const success = pos =>{
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
  })
}

  const error = () => {
    setHasError(true)
    setIsLoading(false)
  }

  navigator.geolocation.getCurrentPosition(success, error)
},[])

console.log(coords)

useEffect(() => {
  const API_KEY ='3c4be94349b6f4d83d59efa990c6a651'
  if(coords){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
    axios.get(url)
    .then(res => {
      setWeather(res.data)
      const celsius = (res.data.main.temp - 273.15).toFixed(1)
      const fahrenheit = (celsius * 9/5 +32).toFixed(1)
      setTemp({celsius, fahrenheit})
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading(false) )
  }
}, [coords])

  console.log(weather)
  return (
    <div className='app'>
      {
        isLoading 
        ? (
          <div>
            <Loader/>
            {
              showMessagge && <p>debes permitir la ubicación</p>
            }
          </div>
      )
        : (
          hasError
        ? //<h1> X Para obtener el clima de tu ciudad, permite la ubicación</h1>
          <Error404 />
        : (<WeaterCards weather={weather} temp={temp}/>)
        ) 

      }
      
    </div>
    
  )
}

export default App