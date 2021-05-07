import './App.css';
import {useState, useEffect} from 'react';
import LeftInfo from './LeftInfo';
import MainInfo from './MainInfo';
import store from './Redux/store';

import bg_1 from './Bg/bg_1.jpg';
import bg_2 from './Bg/bg_2.jpg';
import bg_3 from './Bg/bg_3.png';
import bg_4 from './Bg/bg_4.jpg';
import bg_5 from './Bg/bg_5.jpg';
import bg_6 from './Bg/bg_6.jpg';
import bg_7 from './Bg/bg_7.jpg';
import bg_8 from './Bg/bg_8.jpg';
import bg_9 from './Bg/bg_9.jpg';
import bg_10 from './Bg/bg_10.jpg';
import bg_11 from './Bg/bg_11.png';
import bg_12 from './Bg/bg_12.jpg';
import bg_13 from './Bg/bg_13.jpg';
import bg_14 from './Bg/bg_14.jpg';
import bg_15 from './Bg/bg_15.jpg';

var bgStyle = {
  backgroundImage: `url(${bg_13})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "row",
};

//local_time:
//humidity:
//temperature:

function App() {

  const [styleObj, setStyleObj] = useState({
    backgroundImage: `url(${bg_1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  })

  useEffect(()=>{
    let subscribe = store.subscribe(async ()=>{

      let currentState = store.getState();

      let temp = currentState.temperature;
      let humidity = currentState.humidity;
      let localTime = currentState.local_time.getHours();

  
      if(localTime > 21 || localTime <= 4)
      {
        //night images: 6, 10, 
        if(humidity > 60)
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_7})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
        else if(temp > 10)
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_6})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
        else
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_10})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
      }
      else if (localTime > 4 && localTime <= 8)
      {
        //early morning: 5, 8, 9, 11, 15
        let random = Math.random();
        if(random < 0.2)
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_8})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
        else if(random > 0.2 && random<0.4)
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_9})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
        else if(random > 0.4 && random <0.6)
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_11})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
        else if (random > 0.6 && random <0.8)
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_15})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
        else
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_5})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
      }
      else if(localTime > 8 && localTime <= 12)
      {
        //4 , 14
        let random = Math.random();
        if(random > 0.5)
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_4})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
        else
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_14})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
      }
      else if(localTime > 12 && localTime <= 18)
      {
        //1, 12
        if(temp > 30)
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_12})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
        else 
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_1})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
      }
      else //18-21
      {
        //2,3
        let random = Math.random();
        if(random >= 0.5)
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_2})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
        else
        {
          setStyleObj({
            ...styleObj,
            backgroundImage: `url(${bg_3})`,
            transition: "background-image 0.2s ease-in-out"
          })
        }
      }
    })
  },[])
  return (
    <div className="App" style={styleObj}>
      <div className="left-container">
        <LeftInfo />
      </div>
      <div className="right-container">
        <MainInfo />
      </div>
    </div>
  );
}

export default App;
