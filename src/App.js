//eslint
import React, { useEffect, useState } from "react";
import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Description from "./Components/Description";
import { getFormattedWeatherData } from "./Components/weatherService";

function App() {
  const [city , setCity] = useState('panipat')
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg , setBg] = useState(hotBg)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);


      //dynamic background
      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else (setBg(hotBg))
    };
    fetchWeatherData();
  }, [units , city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1)

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C'
 setUnits(isCelsius ? 'metric' : 'imperial')
  };

  const enterKeyPressed = (e) =>{
    if(e.keyCode === 13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur()
    }
     
  }

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="conatiner">
            <div className=" section section__inputs">
              <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City" />
              <button onClick={(e)=> handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section__temperture">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather icon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperture">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            {/* bottom descrition */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
