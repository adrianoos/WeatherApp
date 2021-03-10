export const getWeatherByCity = city => {
    const APIkey = 'f4595a28632c170d38edc5066fd9f2bd'
    return fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
    )
    .then(resp => resp.json())
    };
