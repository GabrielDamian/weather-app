import React, {useState,useEffect} from 'react'
import cityList from './cityList';
import store from './Redux/store';
import {ApiInfo} from './APIData';
import {Kelvin_to_Celsius,get_local_time} from './GlobalFunctions';
import * as actions from './Redux/actionTypes';
import './CityListComponent.css';

const CityListComponent = () => {
    
    const [four_random_cities, setFour_Random_Cities] = useState([]);

    useEffect(()=>{
        let copy_citites = [...cityList];
        console.log("initial:",copy_citites);

        let temp_array = [];
        console.log("temp_array",temp_array);
        for(let i = 0;i<4;i++)
        {
            let temp_city = copy_citites[generateRandom(copy_citites.length)];
            temp_array.push(temp_city);

            //remove temp_city din copy_cities
            //array.remove don't work, weird
            let temp_index = copy_citites.indexOf(temp_city);
            copy_citites.splice(temp_index,1);
        }
        console.log("Randoms:", temp_array);
        setFour_Random_Cities(temp_array);
    },[])
    
    function generateRandom(max)
    {
        let random = Math.random()*max;
        random = Math.floor(random);
        return random
    }
    async function updateCityInStore(city)
    {
        let getData = await fetch(`${ApiInfo.base}weather?q=${city}&appid=${ApiInfo.key}`).then(weather => {
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
    return (
        <>
            {
                four_random_cities.map((city)=>{
                    return(<p onClick={()=>updateCityInStore(city)} className="city-components">{city}</p>)
                })
            }
        </>
    )
}

export default CityListComponent;
