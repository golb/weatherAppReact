import axios from 'axios';

axios.defaults.baseURL = 'http://api.openweathermap.org/data';

const API_VERSION = '2.5';
const API_KEY = 'e2299f1a350aa44fa9fb052177c01527';

export const getWeather = async (params) => {
    params.appid = API_KEY;
    try {
        const response = await axios.get(`/${API_VERSION}/${params.weatherType}`, {
            params: params/* {
                appid: API_KEY,
                //q: queryParams.city,
                lat: params.latitude,
                lon: params.longitude
            } */
        });
        return response;
    } catch (err) {
        return err;
    }
};
