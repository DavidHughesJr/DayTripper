import { WEATHER_API_KEY } from "./config";
import { getJSON } from "./helper";

export const state = {
  weather: {},
  hourlyWeather: {},
};

const getCurrentDay = () => {
  const dateObj = new Date();
  const date = dateObj.toDateString();
  // Get current time and convert it to a modern look //
  const currentTime = dateObj.toLocaleTimeString();
  const modernTime = currentTime.slice(0, 4).concat(currentTime.slice(7));
  return `${date} , ${modernTime} `;
};

const createWeatherObject = (data) => {
  const currentWeather = data.current;
  const currentForcast = data.forecast.forecastday[0].day;
  const currentLocation = data.location;
  getCurrentDay();
// return in the format you want // 
  return {
    currentWeatherF: currentWeather.temp_f,
    currentWeatherC: currentWeather.temp_c,
    currentImage: currentWeather.condition.icon,
    currentCity: currentLocation.name,
    currentState: currentLocation.region,
    feelsLikeF: currentWeather.feelslike_f,
    feelsLikeC: currentWeather.feelslike_c,
    currentTime: getCurrentDay(),
    currentCondition: currentWeather.condition.text,
    currentHighF: currentForcast.maxtemp_f,
    currentHighC: currentForcast.maxtemp_c,
    currentLowF: currentForcast.mintemp_f,
    currentLowC: currentForcast.mintemp_c,
  };
};

const createHourlyWeather = (data) => {
const hourly = data.forecast.forecastday[0].hour;
// map though hourly
const newHourly = hourly.map((hourly) => {
  const hourlyWeather = {
    hour: `${hourly.time}`,
    img: `${hourly.condition.icon}`,
    degreeF: `${hourly.temp_f}`,
    degreeC: `${hourly.temp_c}`,
    rainChance: `${hourly.chance_of_rain}`,
  };
  return hourlyWeather
});

state.hourlyWeather = newHourly
 return state.hourlyWeather;
}

// ----- API CALL TO GET THE WEATHER ---- //
export const loadWeather = async (lat, lng) => {
  try {
    const data = await getJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=912dcf5c18be4069a92161630220506&q=${lat},${lng}&days=7&aqi=no&alerts=no`
    );
    createHourlyWeather(data); 
    state.weather = createWeatherObject(data);
    return state.weather;
  } catch (error) {
    console.error(error.message);
  }
}
