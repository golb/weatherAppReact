import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherSelector, fetchWeather, setDataFromLocalStorage, setSavedCities } from "../weather/weatherSlice";

export const useStorage = (city) => {
    const store = useSelector(weatherSelector);
    const dispatch = useDispatch();

    const saveToStorage = () => {
        localStorage.setItem((store.city).toUpperCase(), JSON.stringify(store));
    };

    const getFromStorage = () => {
        let weather = localStorage.getItem((store.city).toUpperCase());
        weather = JSON.parse(weather);
        if (weather) {
            dispatch(setDataFromLocalStorage(weather));
            getSavedCities();
        } else {
            dispatch(fetchWeather({
                weatherType: 'weather',
                q: store.city,
            }));
            
        }
    };

    const getSavedCities = () => {
        const cities = Object.keys(localStorage);
        dispatch(setSavedCities(cities));
    };

    const removeFromStorage = (city) => {
        localStorage.removeItem(city.toUpperCase());
        getSavedCities();
    };

    useEffect(() => {
        if (!store.loading && !store.error) {
            saveToStorage();
        }
    }, [store.loading]);

    useEffect(() => {
        if (store.city) {
            getFromStorage();
        }
    }, [store.city]);

    useEffect(() => {
        getSavedCities();
    }, []);

    useEffect(() => {
        if (city) {
            removeFromStorage(city);
        }
    }, [city]);

    return null;
};
