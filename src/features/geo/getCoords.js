export const getCoords = () => {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    } else {
        return Promise.reject(new Error('Geolocation is not supported by this browser'));
    }
};
