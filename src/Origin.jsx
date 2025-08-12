import {useState} from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import './Origin.css'

export default function Origin(){
    const [originInfo, setOriginInfo] = useState({
    country: "IN",
    lat: 29.3912753,
    lon: 76.9771675,
    name: "Panipat",
    state: "Haryana"
    });

    let updateInfo = (newInfo) =>{
        setOriginInfo(newInfo);
    }
    return(
        <div>
            <h1><b>Earth Roots</b></h1>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={originInfo}/>
        </div>
    );
}