import React, { useEffect, useState } from 'react';
import cities from './cities.json';
import WeatherCard from './WeatherCard';

const WeatherComponent = () => {
  const [cityData, setCityData] = useState([]);   //why usestate?
  const [weatherReport, setWeatherReport] = useState([]);

  useEffect(() => {       //why useEffect
    setCityData(cities.List);
    //console.log(cityData);
    console.log('Use effect to set cityData ran sucessfully');

  }, []);

  const getWeatherData = async (cityId) => {
    try {
      const apiKey = '55a0b1c4c73ef41239bc2552928205b0';
      const apiUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityId}&units=metric&appid=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('ran getWeatherData');
      const data = await response.json();
      console.log(data.list);
      return data.list;
      //setWeatherReport(data.list);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  useEffect(() => {
    const cityCodes = cityData.map(data => data.CityCode).join(',');
    if (cityCodes.length > 0) {
      fetchDataWithCache(cityCodes);
      //getWeatherData(cityCodes);
      console.log('Ran fetchDataWithCache');
    }
    else {
      console.log('Inside use effect to set weatherReport. But citycodes are not updated');
    }
  }, [cityData]);

  const fetchDataWithCache = async (cityCodes) => {
    const storedData = localStorage.getItem('cachedData');
    const storedTimestamp = localStorage.getItem('cachedDataTimestamp');
    console.log('inside fetchDataWithCache');
    //console.log(storedData);
    console.log(storedTimestamp);
    if (storedData !== null && storedData !== undefined && storedTimestamp) {
      const currentTime = new Date().getTime();
      console.log('Current time = ' + currentTime);

      const timeSinceStored = currentTime - parseInt(storedTimestamp, 10);
      console.log('cache exists');
      if (timeSinceStored < 0.5 * 60 * 1000) {
        try {
          //const parsedData = storedData !== 'undefined' ? JSON.parse(storedData) : null;
          const parsedData = JSON.parse(storedData);
          console.log(parsedData);
          //if (Array.isArray(parsedData)) {
          setWeatherReport(parsedData);
          console.log('Setting weatherReport from cache:', parsedData);


          setTimeout(() => {
            localStorage.removeItem('cachedData');
            localStorage.removeItem('cachedDataTimestamp');
            setWeatherReport([]); // Optionally, clear the data in the component state
            const currentTime2 = new Date().getTime();
            console.log('After 5 minutes time = ' + { currentTime2 });
            console.log('Chache deleted');
          }, 0.5 * 60 * 1000 - timeSinceStored);

          //} else {
          //console.warn('Invalid cached data format. Expected an array.');
          //}
        } catch (error) {
          console.error('Error parsing cached data:', error);
        }
      }
      else {
        // If expired, delete the data from the cache
        localStorage.removeItem('cachedData');
        localStorage.removeItem('cachedDataTimestamp');
      }
    }
    else {
      // No cached data found, fetch new data
      const result = await getWeatherData(cityCodes);
      if (result != null) {
        console.log(result);
        setWeatherReport(result);

        // Store new data with the current timestamp
        const currentTime = new Date().getTime();
        localStorage.setItem('cachedData', JSON.stringify(result)); // Remove .data here
        localStorage.setItem('cachedDataTimestamp', currentTime.toString());
        console.log('Current time = ' + currentTime);
        //console.log('Stored data:', JSON.stringify(result)); // Log the stored data


        // Set a timeout function to clear the cache after 5 minutes
        setTimeout(() => {
          localStorage.removeItem('cachedData');
          localStorage.removeItem('cachedDataTimestamp');
          setWeatherReport([]); // Optionally, clear the data in the component state
          const currentTime2 = new Date().getTime();
          console.log('After 5 minutes time = ' + { currentTime2 });
          console.log('Chache deleted');
        }, 0.5 * 60 * 1000);
      }

    }
  }

  return (
    <div className='weather-container'>
      <h1>Weather App</h1>
      <div className='weather'>
        {weatherReport.map((cityWeather, index) => (
          <WeatherCard key={cityWeather.id} cityWeather={cityWeather} index={index} />
        ))}
      </div>
    </div>
  );
};

export default WeatherComponent;




