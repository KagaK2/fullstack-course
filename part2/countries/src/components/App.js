import React, { useState, useEffect } from "react";
import axios from "axios";

const App = props => {
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewedCountry, setViewedCountry] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    let newSearchResult = countries.filter(country => {
      return country.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResult(newSearchResult);
  }, [countries, searchTerm]);

  useEffect(() => {
    if (viewedCountry != null) {
      axios
        .get(
          `http://api.apixu.com/v1/current.json?key=045b973c62e14c52a4c143943192807&q=${
            viewedCountry.name
          }`
        )
        .then(response => {
          setCurrentWeather(response.data);
        });
    }
  }, [viewedCountry]);

  const renderOneCountry = (currentCountry, currentWeather) => {
    let languages = currentCountry.languages.map(language => (
      <li key={language.name}>{language.name}</li>
    ));
    return (
      <div>
        <h1>{currentCountry.name}</h1>
        <p>capital {currentCountry.capital}</p>
        <p>population {currentCountry.population}</p>
        <h2>languages</h2>
        <ul>{languages}</ul>
        <img
          src={currentCountry.flag}
          alt="country's flag"
          height="128"
          width="128"
        />
        <div>
          <h2>Weather in {currentWeather.location.name}</h2>
          <p>
            <b>temperature:</b> {currentWeather.current.temp_c} Celsius
          </p>
          <img src={currentWeather.current.condition.icon} alt="" />
          <p>
            <b>wind:</b> {currentWeather.current.wind_kph} kph direction{" "}
            {currentWeather.current.wind_dir}
          </p>
        </div>
      </div>
    );
  };

  const renderCountries = array => {
    if (array.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (array.length <= 10 && array.length > 1) {
      let countriesList = array.map(country => {
        return (
          <div key={country.name}>
            <div>{country.name}</div>
            <button onClick={() => setViewedCountry(country)}>show</button>
          </div>
        );
      });
      return <div>{countriesList}</div>;
    } else if (array.length === 1) {
      let currentCountry = array[0];
      if (viewedCountry != currentCountry) {
        setViewedCountry(currentCountry);
      }
      return null;
      //return renderOneCountry(currentCountry);
    }

    return <div>no country matched</div>;
  };

  return (
    <div>
      find countries{" "}
      <input
        onChange={e => {
          setSearchTerm(e.target.value);
          setViewedCountry(null);
        }}
        value={searchTerm}
      />
      <div>{renderCountries(searchResult)}</div>
      <div>
        {viewedCountry && currentWeather
          ? renderOneCountry(viewedCountry, currentWeather)
          : null}
      </div>
    </div>
  );
};

export default App;
