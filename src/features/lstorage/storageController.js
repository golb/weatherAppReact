import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherSelector, fetchWeather, setDataFromLocalStorage } from "../weather/weatherSlice";

export const useStorage = () => {
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
        } else {
            dispatch(fetchWeather({
                weatherType: 'weather',
                q: store.city,
            }));
        }
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

    return null;
};
