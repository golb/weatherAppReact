import React, { useEffect, useState } from 'react';
import { useAxiosHook } from '../axios/axiosHook';

function Weather() {
    const defaultCity = 'Krasnodar';
    const data = 'weather'; // TODO Rename it

    const [city, setCity] = useState(defaultCity);
    const [weatherData, setWeatherData] = useState(data);

    const {loading: loadingWeather, response: weather, error} = useAxiosHook({
        city: city,
        data: data
    });

    const makeFirstLetterUppercase = (str) => {
        const upperCased = str.charAt(0).toUpperCase() + str.slice(1);
        setWeatherData(upperCased);
    };

    const changeCity = () => { // TODO change to input field
        setCity('Moscow');
    }

    useEffect(() => {
        makeFirstLetterUppercase(data);
    }, [weather]);

    return (
        <>
            <button onClick={() => changeCity()}>
                Change City
            </button>

            {loadingWeather ? (
                <div>Loading {data} for {city}...</div>
            ) : (
                <div>
                    {error && (
                        <p>Oops! {error.message}</p>
                    )}
                    {weather && (
                        <>
                            <h2>{weatherData} for {weather.name}</h2>
                            <h3>{weather.weather[0].main}</h3>
                            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} />
                            <p>{weather.weather[0].description}</p>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default Weather;
