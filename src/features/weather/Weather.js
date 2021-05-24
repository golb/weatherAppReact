import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity, fetchWeather, weatherSelector } from './weatherSlice';
import { useStorage } from '../lstorage/storageController';
import Cities from '../cities/Cities';
import './weather.css';

function Weather() {
    const {
        city,
        loading,
        error,
        weather,
        weatherIcon,
        weatherDescription,
        savedCities
    } = useSelector(weatherSelector);

    const [inputCity, setInputCity] = useState('');
    const [removedCity, setRemovedCity] = useState('');

    const dispatch = useDispatch();

    const handleCity = (e) => {
        const city = e.target.value;
        setInputCity(city);
    };

    const queryWeather = (city) => {
        if (!city) {
            city = inputCity;
        }
        dispatch(changeCity(city));
    };

    const removeCity = (city) => {
        setRemovedCity(city);
    }

    useStorage(removedCity);

    useEffect(() => {
        dispatch(fetchWeather());
    }, [dispatch]);

    return (
        <>
            {error ? (
                <div>
                    <p>Oops! {error.message}</p>
                </div>
            ) : (
                <div>
                    {loading && (
                        <div>Loading Weather in {city ? city : 'Your Location by Geo Position'}...</div>
                    )}
                    {!loading && (
                        <div className="card">
                            <h2>Weather in {city}</h2>
                            <h3>{weather}</h3>
                            <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weather} />
                            <p>{weatherDescription}</p>
                        </div>
                    )}
                </div>
            )}

            {(error || !loading) && (
                <div className="city-input-wrapper">
                    <h4>Or get it in other city:</h4>
                    <input type="text" value={inputCity} onChange={(e) => handleCity(e)} />
                    <button onClick={() => queryWeather()} >
                        Get Weather
                    </button>
                </div>
            )}

            {savedCities && (
                <Cities
                    cities={savedCities}
                    onChooseCity={queryWeather}
                    onRemoveCity={removeCity} />
            )}
        </>
    );
}

export default Weather;
