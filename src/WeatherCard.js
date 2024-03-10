import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDateandTime, getTime, capitalizeEachWord } from './functions';

const WeatherCard = ({ cityWeather, index }) => {
    const navigate = useNavigate();
    const colors = ['#6346e8', '#8342d4', '#21a81d', '#eba210', '#e64b40']
    const backgroundColor = colors[index % colors.length];
    const iconLink =  'https://openweathermap.org/img/wn/' + cityWeather.weather[0].icon + '.png';
    /*const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

    useEffect(() => {
        setBackgroundColor(getRandomColor());
    }, []);*/

    const handleClick = () => {
        navigate(`/view-weather/${cityWeather.id}`, { state: { weatherData: cityWeather, backgroundColor: backgroundColor } });
    }


    return (
        <div className='weather-card' onClick={handleClick} style={{ backgroundColor: backgroundColor }}>
            <div className='row'>
                <div className='column'>
                    <p className='city'>{cityWeather.name}, {cityWeather.sys.country}</p>
                    <p className='date'>{getDateandTime(cityWeather.dt, cityWeather.sys.timezone)}</p>
                    <p className='descrip'>
                        {<img src={iconLink} alt="Weather Icon"/>}
                        <span>{capitalizeEachWord(cityWeather.weather[0].description)}</span>
                    </p>
                </div>
                <div className='column'>
                    <p className='temp'>{`${(cityWeather.main.temp).toFixed(0)}°c`}</p>
                    <p className='temp-range'>{`Temp Min: ${(cityWeather.main.temp_min).toFixed(0)}°c`}</p>
                    <p className='temp-range'>{`Temp Max: ${(cityWeather.main.temp_max).toFixed(0)}°c`}</p>
                </div>
            </div>
            <div className='row bottom'>
                <div className='column'>
                    <p>{`Pressure: ${cityWeather.main.pressure}hPa`}</p>
                    <p>{`Humidity: ${cityWeather.main.humidity}%`}</p>
                    <p>{`Visibility: ${(cityWeather.visibility / 1000).toFixed(1)}km`}</p>
                </div>
                <div className='column'>
                    <p>{`${(cityWeather.wind.speed).toFixed(1)}m/s ${cityWeather.wind.deg} Degree`}</p>
                </div>
                <div className='column'>
                    <p>{`Sunrise: ${getTime(cityWeather.sys.sunrise, cityWeather.sys.timezone)}`}</p>
                    <p>{`Sunset: ${getTime(cityWeather.sys.sunset, cityWeather.sys.timezone)}`}</p>
                </div>
            </div>
        </div>
    )
}

const getRandomColor = () => {
    const minThreshold = 50;
    const getRandomComponent = () => Math.floor(Math.random() * (255 - minThreshold + 1)) + minThreshold;

    const red = getRandomComponent();
    const green = getRandomComponent();
    const blue = getRandomComponent();

    return `rgb(${red}, ${green}, ${blue})`;
};

export default WeatherCard;
