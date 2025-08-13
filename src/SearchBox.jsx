import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const getCityImage = async (q) => {
    try {
      const searchParams = new URLSearchParams({
        action: "query",
        format: "json",
        formatversion: "2",
        generator: "prefixsearch",
        gpssearch: q,
        gpslimit: "1",
        prop: "pageimages",
        piprop: "thumbnail",
        pithumbsize: "800",
        pilimit: "1",
        redirects: "",
        origin: "*",
      });

      const res = await fetch(`https://en.wikipedia.org/w/api.php?${searchParams.toString()}`);
      const data = await res.json();
      const pages = data?.query?.pages || [];

      if (!pages.length) {
        return null;
      }

      let page = pages[0];
      if (!page.thumbnail && page.title) {
        const byTitleParams = new URLSearchParams({
          action: "query",
          format: "json",
          formatversion: "2",
          prop: "pageimages",
          piprop: "thumbnail",
          pithumbsize: "800",
          titles: page.title,
          redirects: "",
          origin: "*",
        });
        const res2 = await fetch(`https://en.wikipedia.org/w/api.php?${byTitleParams.toString()}`);
        const data2 = await res2.json();
        const pages2 = data2?.query?.pages || [];

        if (pages2.length && pages2[0].thumbnail) {
          return pages2[0].thumbnail.source;
        }
      }

      return page.thumbnail?.source || null;
    } catch (err) {
      return null;
    }
  };

  const getOriginInfo = async () => {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}&units=metric`);
    const jsonResponse = await response.json();

    if (!jsonResponse || jsonResponse.length === 0) {
      throw new Error("City not found");
    }

    const image = await getCityImage(city);
    return {
      country: jsonResponse[0].country,
      lat: jsonResponse[0].lat,
      lon: jsonResponse[0].lon,
      name: jsonResponse[0].name,
      state: jsonResponse[0].state,
      cityimage: image || 'https://images.unsplash.com/photo-1581091870622-2fe8f2ed98c5?auto=format&fit=crop&w=800&q=80',
    };
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newInfo = await getOriginInfo();
      updateInfo(newInfo);
      setError(false);
      setCity("");
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
