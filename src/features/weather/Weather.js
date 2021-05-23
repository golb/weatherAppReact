import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity, fetchWeather, weatherSelector } from './weatherSlice';
import { useStorage } from '../lstorage/storageController';

function Weather() {
    const {
        city,
        loading,
        error,
        weather,
        weatherIcon,
        weatherDescription
    } = useSelector(weatherSelector);

    const [inputCity, setInputCity] = useState('');

    const dispatch = useDispatch();

    const handleCity = (e) => {
        const city = e.target.value;
        setInputCity(city);
    };

    const queryWeather = () => {
        dispatch(changeCity(inputCity));
    };

    useStorage();

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
                        <div>
                            <h2>Weather in {city}</h2>
                            <h3>{weather}</h3>
                            <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weather} />
                            <p>{weatherDescription}</p>
                        </div>
                    )}
                </div>
            )}

            {error || !loading && (
                <div>
                    <input type="text" value={inputCity} onChange={(e) => handleCity(e)} />
                    <button onClick={() => queryWeather()}>
                        Get Weather
                    </button>
                </div>
            )}
        </>
    );
}

export default Weather;
