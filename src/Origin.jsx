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
    state: "Haryana",
    cityimage: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFydGh8ZW58MHx8MHx8fDA%3D',
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