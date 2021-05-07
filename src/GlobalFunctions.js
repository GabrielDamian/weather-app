import {ApiInfo} from './APIData';
import store from './Redux/store';
import * as actions from './Redux/actionTypes';

export function Kelvin_to_Celsius(f_temp)
{
     return Math.floor(f_temp - 273.15);

}

export function get_local_time(timezone)
{
    var d1 = new Date();

    var utc = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() ); 

    var utc_in_sec = Math.floor(utc.getTime()/ 1000); //utc in seconds
    
    var local_api_in_sec = utc_in_sec + timezone;

    //--corect

    var final_date = new Date(null);
    final_date.setSeconds(local_api_in_sec);

    return final_date;
}

export function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(processPosition);
    } else {
      alert("Geolocation not supported !")
    }
}
async function processPosition(position) {
    //console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
    var latitude = position.coords.latitude;
    var logitude = position.coords.longitude;

    let getData = await fetch(`${ApiInfo.base}weather?lat=${latitude}&lon=${logitude}&appid=${ApiInfo.key}`).then(weather => {
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