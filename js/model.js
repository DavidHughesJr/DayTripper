import { WEATHER_API_KEY } from "./config";
import { getJSON } from "./helper";
import { RESULTS_PER_PANEL } from "./config";
import noPhoto from "url:../imgs/no-photo.jpg";

export const state = {
  weather: {},
  hourlyWeather: {},
  weeklyWeather: {},
  astroWeather: {},
  searchAttractions: {
    attractions: [],
    resultsPerPanel: RESULTS_PER_PANEL,
    page: 3,
  },
  searchResturants: {
    attractions: [],
    resultsPerPanel: RESULTS_PER_PANEL,
    page: 1,
  },
  searchHotels: {
    attractions: [],
    resultsPerPanel: RESULTS_PER_PANEL,
    page: 1,
  },
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
  ``;
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
    return hourlyWeather;
  });
  state.hourlyWeather = newHourly;
  return state.hourlyWeather;
};

const createWeeklyWeather = (data) => {
  const weekly = data.forecast.forecastday;
  const newWeekly = weekly.map((weekly) => {
    const weeklyWeather = {
      date: weekly.date,
      icon: weekly.day.condition.icon,
      rainChance: weekly.day.daily_chance_of_rain,
      tempF: weekly.day.avgtemp_f,
      tempC: weekly.day.avgtemp_c,
    };
    return weeklyWeather;
  });
  state.weeklyWeather = newWeekly;
  return state.weeklyWeather;
};

const createAstroWeather = (data) => {
  const uvWindHumdity = data.current;
  const astroInfo = data.forecast.forecastday[0].astro;
  const moreInfo = data.forecast.forecastday[0].hour[0];
  const astro = {
    uv: uvWindHumdity.uv,
    wind: uvWindHumdity.wind_mph,
    humidity: uvWindHumdity.humidity,
    sunImg: "//cdn.weatherapi.com/weather/64x64/day/113.png",
    sunrise: astroInfo.sunrise,
    setImg: "//cdn.weatherapi.com/weather/64x64/night/113.png",
    sunset: astroInfo.sunset,
    heatIndexF: uvWindHumdity.feelslike_f,
    heatIndexC: uvWindHumdity.feelslike_c,
    windDirection: uvWindHumdity.wind_dir,
    dewPointF: moreInfo.dewpoint_f,
    dewPointC: moreInfo.dewpoint_c,
    chanceOfSnow: moreInfo.chance_of_snow,
  };
  state.astroWeather = astro;
  return state.astroWeather;
};

// ----- API CALL TO GET THE WEATHER ---- //
export const loadWeather = async (lat, lng) => {
  try {
    const data = await getJSON(
      ` http://api.weatherapi.com/v1/forecast.json?key=3842bad69ba64b70a98112348222006&q=${lat},${lng}&days=3&aqi=no&alerts=no`
    );
    createHourlyWeather(data);
    createWeeklyWeather(data);
    createAstroWeather(data);
    state.weather = createWeatherObject(data);
    return state.weather;
  } catch (error) {
    console.error(error.message);
  }
};
// --- API CALL TO GET THE ATTRACTION DATA --- //
export const loadAttractions = async (lat, lng) => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "a5e24c2040mshd8b74b4cda9ea81p1c011ajsn693d707f467c",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=${lng}&latitude=${lat}&lunit=km&currency=USD&lang=en_US`,
      options
    );
    const data = await response.json();
    const attractionsData = data.data;
    // map to reorganize data
    const attractionsCardData = attractionsData.map((data) => {
      const attractions = {
        companyName: data.parent_display_name,
        isClosed: data.is_closed,
        location: data.location_string,
        type: data.name,
        image: data.photo?.images.thumbnail.url ?? noPhoto, 
        address: [
          data.address_obj.street1,
          data.address_obj.city,
          data.address_obj.state,
          data.address_obj.postalcode,
          data.address_obj.country,
        ],
        websiteUrl: data.web_url,
      };
      return attractions;
    });
    state.searchAttractions.attractions = attractionsCardData;
    return state.searchAttractions.attractions;
  } catch (error) {
    console.error(error);
  }
};

// ----  PAGINATION ---- //
export const getAttractionsPage = (page = state.searchAttractions.page) => {
  state.searchAttractions.page = page;
  const start = (page - 1) * 3;
  const end = page * state.searchAttractions.resultsPerPanel;
  return state.searchAttractions.attractions.slice(start, end);
};
