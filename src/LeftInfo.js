import React, {useEffect, useState} from 'react'
import './LeftInfo.css';
import store from './Redux/store';
import celsius_png from './Icons/celsius._white.png';

const LeftInfo = () => {
    const [temp, setTemp] = useState(0);
    const [location, setLocation] = useState('');
    const [localTime, setLocalTime] = useState(new Date());

    useEffect(()=>{
        let subscribe = store.subscribe(()=>{
            console.log("store updated");

            let current_state = store.getState();
            setTemp(current_state.temperature);
            setLocation(current_state.location);
            setLocalTime(current_state.local_time);
            let temp = new Date();
            temp.getHours();
            temp.getMinutes();

            temp.getDate();
            temp.getMonth();
        });
    },[])
    return (
        <div className="LeftInfo-container">
            <div className="alingment">
                <div className="flex-aligment">
                    <div className="grade-container">
                        <span>
                            {temp}
                            <img src={celsius_png} alt="celsius-icon" />
                        </span>
                    </div>

                    <div className="middlelocation">
                        <div className="span-location">
                            <span>{location}</span>
                        </div>
                        <div className="span-date">
                            <span> {`${localTime.getHours()}:${localTime.getMinutes()} - ${localTime.getDate()}/${localTime.getMonth()}/${localTime.getFullYear()}`}</span>
                        </div>
                    </div>
                        
                    {/* <div className="icon-container">
                        <span>Icon here</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default LeftInfo
