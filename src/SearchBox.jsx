import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './SearchBox.css'

export default function SearchBox({ updateInfo }) {
    // Access .env variables in Vite
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    let getOriginInfo = async () => {
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);

        let jsonResponse = await response.json();

        // Handle no results
        if (!jsonResponse || jsonResponse.length === 0) {
            throw new Error("City not found");
        }

        let result = {
            country: jsonResponse[0].country,
            lat: jsonResponse[0].lat,
            lon: jsonResponse[0].lon,
            name: jsonResponse[0].name,
            state: jsonResponse[0].state
        };

        return result;
    };

    let handleChange = (event) => {
        setCity(event.target.value);
    };

    let handleSubmit = async (event) => {
        event.preventDefault(); // prevent page reload
        try {
            let newInfo = await getOriginInfo();
            updateInfo(newInfo);
            setError(false);
            setCity(""); // clear input after search
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div>
            <h3>Search for the Origin</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    className='input'
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" type="submit">Search</Button>
                {error && <p style={{ color: "red" }}>No such place exists in API</p>}
            </form>
        </div>
    );
}
