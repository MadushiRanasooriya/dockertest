import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import WeatherComponent from './WeatherComponent';
import CityWeather from './CityWeather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WeatherComponent />} />
        <Route path='/view-weather/:id' element={<CityWeather />} />
      </Routes>
    </Router>
  );
}

export default App;