const WEATHER_API_KEY = "bbeb34ebf60ad50f7893e7440a1e2b0b";
const API_STEM = "http://api.openweathermap.org/data/2.5/weather?";

function zipURI(zip: string): string {
    return `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

interface ForecastResponse {
    weather: { main: string, description: string }[];
    main: { temp: number };
}

function fetchForecast(zip: string): Promise<{ main: string; description: string; temp: number }> {
    return fetch(zipURI(zip))
        .then((response) => response.json())
        .then((responseJSON: ForecastResponse) => {
            return {
                main: responseJSON.weather[0].main,
                description: responseJSON.weather[0].description,
                temp: responseJSON.main.temp
            };
        })
        .catch((error) => {
            console.log(error);
            throw error;  // rethrow the error after logging it
        });
}

export default { fetchForecast };
