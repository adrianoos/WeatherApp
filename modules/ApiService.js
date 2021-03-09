export const getWeatherByCity = city => { // fetching data by city name answer from API is ID of city
    return fetch(
        `https://www.metaweather.com/api/location/search/?query=${city}` ,
        {
              method: "POST",
 headers: [
  ['Content-Type', 'application/x-www-form-urlencoded'],
  ['Content-Type', 'multipart/form-data'],
  ['Content-Type', 'text/plain'],
],
  credentials: "include",
  body: JSON.stringify(exerciseForTheReader)
        }
    )
    .then(resp => resp.json())
    .then(data => { 
        const woeid = data[0].woeid;
        return fetch(
            `https://www.metaweather.com/api/location/${woeid}/` // getting weather data by City ID
        ).then(resp => resp.json()).then(data => data) 
    })
    };
 
