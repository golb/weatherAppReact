import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWeather } from "../axios/getWeather";
import { getCoords } from "../geo/getCoords";

const initialState = {
    loading: true,
    error: null,
    city: '',
    latitude: undefined,
    longitude: undefined,
    weather: undefined,
    weatherIcon: undefined,
    weatherDescription: '',
    savedCities: [],
};

export const fetchWeather = createAsyncThunk('fetchWeather', async (fetchParams) => {
    let params = fetchParams;
    if (!fetchParams) {
        const position = await getCoords();
        params = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            weatherType: 'weather',
        };
    }
    const response = await getWeather(params);
    return response.data;
});

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        changeCity(state, action) {
            state.city = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        setLatitude(state, action) {
            state.latitude = action.payload
        },
        setLongitude(state, action) {
            state.longitude = action.payload
        },
        setDataFromLocalStorage(state, action) {
            state.city = action.payload.city;
            state.loading = action.payload.loading;
            state.error = action.payload.error;
            state.city = action.payload.city;
            state.weather = action.payload.weather;
            state.weatherIcon = action.payload.weatherIcon
            state.weatherDescription = action.payload.weatherDescription;
        },
        setSavedCities(state, action) {
            state.savedCities = action.payload
        },
    },
    extraReducers: {
        [fetchWeather.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchWeather.fulfilled]: (state, action) => {
            const weatherData = action.payload;
            state.loading = false;
            state.city = weatherData.name;
            state.weather = weatherData.weather[0].main;
            state.weatherIcon = weatherData.weather[0].icon;
            state.weatherDescription = weatherData.weather[0].description;
        },
        [fetchWeather.rejected]: (state, action) => {
            console.log('action error', action); // todo checking error obj
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { changeCity, setLoading, setError, setLatitude, setLongitude, setDataFromLocalStorage, setSavedCities } = weatherSlice.actions;

export const weatherSelector = (state) => state.weather;

export const selectCity = (state) => state.weather.city;
export const selectLoading = (state) => state.weather.loading;
export const selectError = (state) => state.weather.error;
export const selectLatitude = (state) => state.weather.latitude;
export const selectLongitude = (state) => state.weather.longitude;

export default weatherSlice.reducer;
