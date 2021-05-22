import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://api.openweathermap.org/data';

const API_VERSION = '2.5';
const API_KEY = 'e2299f1a350aa44fa9fb052177c01527';

export const useAxiosHook = (params) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const getData = async (params) => {
        try {
            const response = await axios.get(`/${API_VERSION}/${params.data}`, { // TODO Rename params.data
                params: {
                    appid: API_KEY,
                    q: params.city
                }
            });
            console.log('response', response.data);
            setResponse(response.data);
        } catch(err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData(params);
    }, [params.city, params.data]); // TODO rename params.data to something Weather or Forecats etc

    return {loading, response, error};
};
