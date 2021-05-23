import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity, fetchWeather, weatherSelector } from './weatherSlice';

function Weather() {
    const {
        city,
        loading,
        error,
        weather,
        weatherIcon,
        weatherDescription
    } = useSelector(weatherSelector);

    const dispatch = useDispatch();

    const handleCity = () => {
        dispatch(changeCity('moscow'));
        dispatch(fetchWeather({
            weatherType: 'weather',
            q: 'moscow',
        }));
    };

    useEffect(() => {
        dispatch(fetchWeather());
    }, [dispatch]);

    return (
        <>
            {error ? (
                <div>
                    <p>Oops! {error.message}</p>

                    <button onClick={() => handleCity()}>
                        Try to Change City on Moscow
                    </button>
                </div>
            ) : (
                <div>
                    {loading && (
                        <div>Loading Weather in {city}...</div>
                    )}
                    {!loading && (
                        <div>
                            <h2>Weather in {city}</h2>
                            <h3>{weather}</h3>
                            <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weather} />
                            <p>{weatherDescription}</p>

                            <button onClick={() => handleCity()}>
                                Or Change City on Moscow
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Weather;
