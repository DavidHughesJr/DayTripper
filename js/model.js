import { WEATHER_API_KEY } from "./config";
import { getJSON } from "./helper";

export const state = {
  weather: {},
  hourlyWeather: {},
};

const getCurrentDay = () => {
    const dateObj = new Date();
    console.log(dateObj);
    const date = dateObj.toDateString()
    // Get current time and convert it to a modern look // 
    const currentTime = dateObj.toLocaleTimeString()
    const modernTime = currentTime.slice(0, 4).concat(currentTime.slice(7))
    console.log(modernTime);
    return `${date} , ${modernTime} `
}

const createWeatherObject = (data) => {
  const currentWeather = data.current
  const currentForcast = data.forecast.forecastday[0].day
  const  currentLocation  = data.location
  getCurrentDay()

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
}

// ----- API CALL TO GET THE WEATHER ---- //
export const loadWeather = async (lat, lng) => {
  try {
    const data = await getJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}=${lat},${lng}&days=3&aqi=no&alerts=no`
    );
   state.weather = createWeatherObject(data)
   state.hourlyWeather = ''
   return state.weather , state.hourlyWeather
  } catch (error) {
    console.error(error.message);
  }
};
