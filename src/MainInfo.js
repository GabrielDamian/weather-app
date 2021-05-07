import {useState, useEffect} from 'react';
import React from 'react'
import './MainInfo.css';
import loupe from './Icons/loupe.png';
import {ApiInfo} from './APIData';
import {
    Kelvin_to_Celsius,
    get_local_time,
    getLocation
} from './GlobalFunctions';
import store from './Redux/store';
import * as actions from './Redux/actionTypes';
import CityListComponent from './cityListComponent';

const MainInfo = () => {
    const [input, setInput] = useState('');

    const [main, setMain] = useState('');
    const [description, setDescription] = useState('');
    const [humidity, steHumidity] = useState('');
    const [wind, setWind] = useState('');

    useEffect(()=>{
        let subscribe = store.subscribe(()=>{
            console.log("store updated");
            

        let current_state = store.getState();
        setMain(current_state.main);
        setDescription(current_state.description);
        steHumidity(current_state.humidity);
        setWind(current_state.wind);
        });


        setInput('London');
        startProcessor();
        setInput('');
        
    },[])
    function handleInputChange(event)
    {
        setInput(event.target.value);
    }

    async function startProcessor()
    {
        if(input == '')
        {
            console.log("Empty input");
        }
        else
        {
            let getData = await fetch(`${ApiInfo.base}weather?q=${input}&appid=${ApiInfo.key}`).then(weather => {
                return weather.json();
              }).then((finalData)=>{
                  return finalData;
              });


            let prepared_payload = {
                local_time : get_local_time(getData.timezone),
                location : getData.name,
                humidity : getData.main.humidity,
                country : getData.sys.country,
                main : getData.weather[0].main,
                description : getData.weather[0].description,
                temperature: Kelvin_to_Celsius(getData.main.temp),
                wind: getData.wind.speed,
            };

            store.dispatch({
                type: actions.update_store,
                payload: prepared_payload,
            })
        }
    }
    return (
        <div className="MainInfo-body">
            <div className="input">
                <div className="input-container">
                    <input value={input} onChange={handleInputChange} placeholder="Search other location"/>
                </div>
                <div className="search-button" onClick={startProcessor}>
                    <img src={loupe} alt="seatch-loupe"/>
                </div>
            </div>
            <div className="locations">
                <div className="location-container">
                    <div className="compacter">
                        <h3>Other Locations:</h3>
                        <button onClick={()=>{
                            getLocation();
                        }}>My localtion</button>
                    </div>
                    <CityListComponent />
                </div>
                
            </div>            
            <div className="details">
                <div className="details-container">
                    <h3>Weather Details (now):</h3>
                    <p>Main:  {main}</p>
                    <p>Description: {description}</p>
                    <p>Humidity: {humidity}%</p>
                    <p>Wind speed: {wind} km/h</p>
                </div>
            </div>
            
        </div>
    )
}

export default MainInfo
