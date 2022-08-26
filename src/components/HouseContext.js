import React, { createContext, useState, useEffect } from 'react';

// import data
import { housesData } from '../data';

// create context
export const HouseContext = createContext();

// provider
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [year, setYear] = useState('Year (any)');
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // return all countries
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // remove duplicates
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
  }, []);

  useEffect(() => {
    // return only properties
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // remove duplicates
    const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];

    // set properties state
    setProperties(uniqueProperties);
  }, []);

  useEffect(() => {
    // return only years
    const allYears = houses.map((house) => {
      return house.year;
    });

    // remove duplicates
    const uniqueYears = ['Year (any)', ...new Set(allYears)];

    // set years state
    setYears(uniqueYears);
  }, []);

  const handleClick = () => {
    setLoading(true);
    // check the string if includes '(any)'
    const isDefault = (str) => {
      return str.split(' ').includes('(any)');
    };

    // get first string (price) and parse it to number
    const minPrice = parseInt(price.split(' ')[0]);
    // get last string (price) and parse it to number
    const maxPrice = parseInt(price.split(' ')[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      // all values are selected
      if (
        house.country === country &&
        house.type === property &&
        house.year === year &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      // all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price) && isDefault(year)) {
        return house;
      }
      // country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price) && isDefault(year)) {
        return house.country === country;
      }
      // property is not default
      if (!isDefault(property) && isDefault(country) && isDefault(price) && isDefault(year)) {
        return house.type === property;
      }
      // if year is not default
      if (!isDefault(year) && isDefault(country)&& isDefault(price) && isDefault(property)) {
        return house.year === year;
      }
      // price is not default
      if (!isDefault(price) && isDefault(country) && isDefault(property) && isDefault(year)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }
      // country and property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price) && isDefault(year)) {
        return house.country === country && house.type === property;
      }
      // country and price is not default
      if (!isDefault(country) && isDefault(property) && !isDefault(price) && isDefault(year)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }
      // country property and price is not default
      if (!isDefault(country) && !isDefault(property) && !isDefault(price) && isDefault(year)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country && house.type === property;
        }
      }

      // year price and property is not default
      if (isDefault(country) && !isDefault(property) && !isDefault(price) && !isDefault(year)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.year === year && house.type === property;
        }
      }
      // year country and property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price) && !isDefault(year)) {
        return house.country === country && house.type === property && house.year === year ;
      }
      // year price and country is not default
      if (!isDefault(country) && isDefault(property) && !isDefault(price) && !isDefault(year)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.year === year && house.country === country;
        }
      }

      // country and year is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price) && !isDefault(year)) {
        return house.country === country && house.year === year;
      }
      // property and price is not default
      if (isDefault(country) && !isDefault(property) && !isDefault(price) && isDefault(year)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
      // price  and year is not default
      if (isDefault(country) && isDefault(property) && !isDefault(price) && !isDefault(year)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.year === year;
        }
      }
      // property and year is not default
      if (isDefault(country) && !isDefault(property) && isDefault(price) && !isDefault(year)) {
        return house.year === year && house.type === property;
      }
    });

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        year,
        setYear,
        years,
        handleClick,
        houses,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;