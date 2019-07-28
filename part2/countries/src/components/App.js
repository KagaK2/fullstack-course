import React, { useState, useEffect } from "react";
import axios from "axios";

const App = props => {
  const [countries, setCountries] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  const renderCountries = array => {
    if (array.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (array.length <= 10 && array.length > 1) {
      let countriesList = array.map(country => {
        return <div key={country.name}>{country.name}</div>;
      });
      return <div>{countriesList}</div>;
    } else if (array.length === 1) {
      let currentCountry = array[0];
      let languages = currentCountry.languages.map(language => (
        <li key={language.name}>{language.name}</li>
      ));
      console.log(currentCountry);
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
        </div>
      );
    }
    return <div>no country matched</div>;
  };

  return (
    <div>
      find countries{" "}
      <input
        onChange={e => {
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
      />
      <div>{renderCountries(searchResult)}</div>
    </div>
  );
};

export default App;
