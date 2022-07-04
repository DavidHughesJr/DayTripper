import { WEATHER_API_KEY } from "./config";
import { getJSON, getJSONWithOptions } from "./helper";
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
    page: 1,
  },
  searchRestaurants: {
    restaurants: [],
    resultsPerPanel: RESULTS_PER_PANEL,
    page: 1,
  },
  searchHotels: {
    hotels: [],
    resultsPerPanel: RESULTS_PER_PANEL,
    page: 1,
  },
  saved: [],
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
        "X-RapidAPI-Key": "da2a62b283mshaf8a911de98e163p19a6a5jsn2501d3b12ffd",
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
        id: data.location_id,
        companyName: data.parent_display_name,
        isClosed: data.is_closed,
        location: data.location_string,
        name: data.name,
        image: data.photo?.images.thumbnail.url ?? noPhoto,
        address: [
          data.address_obj.street1,
          data.address_obj.city,
          data.address_obj.state,
          data.address_obj.postalcode,
          data.address_obj.country,
        ],
        tripAdvisorUrl: data.web_url
          ? data.web_url
          : `https://www.tripadvisor.com/Search?q=${data.name}&search`,
      };
      return attractions;
    });
    state.searchAttractions.attractions = attractionsCardData;
    if (state.saved.some((save) => save.id === id))
      state.searchAttractions.attractions.saved = true;
    else state.searchAttractions.attractions.saved = false;
    return state.searchAttractions.attractions;
  } catch (error) {
    console.error(error);
  }
};

// ----  ATTRACTIONS PAGINATION ---- //
export const getAttractionsPage = (page = state.searchAttractions.page) => {
  state.searchAttractions.page = page;
  const start = (page - 1) * 3;
  const end = page * state.searchAttractions.resultsPerPanel;
  return state.searchAttractions.attractions.slice(start, end);
};

// ---  API CALL TO GET THE ATTRACTION DATA ---- //
export const loadRestaurants = async (lat, lng) => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "da2a62b283mshaf8a911de98e163p19a6a5jsn2501d3b12ffd",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${lng}&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`,
      options
    );
    const data = await response.json();
    const restaurantsData = data.data;
    const restaurantsCardData = restaurantsData.map((data) => {
      const restaurants = {
        companyName: data.parent_display_name,
        isClosed: data.is_closed,
        location: data.location_string,
        name: data.name,
        image: data.photo?.images.thumbnail.url ?? noPhoto,
        address: data.address,
        tripAdvisorUrl: data.web_url
          ? data.web_url
          : `https://www.tripadvisor.com/Search?q=${data.name}&search`,
      };
      return restaurants;
    });
    state.searchRestaurants.restaurants = restaurantsCardData;
    return state.searchRestaurants.restaurants;
  } catch (err) {
    console.error(err);
  }
};
// ----- RESTAURANTS PAGINATION ----- //
export const getResturantsPage = (page = state.searchAttractions.page) => {
  state.searchRestaurants.page = page;

  const start = (page - 1) * 3;
  const end = page * state.searchRestaurants.resultsPerPanel;
  return state.searchRestaurants.restaurants.slice(start, end);
};

// ---- API CALL TO GET THE HOTEL DATA ---- //
export const loadHotels = async (city, region) => {
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "da2a62b283mshaf8a911de98e163p19a6a5jsn2501d3b12ffd",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };
    // weather api is used to generate the name & region for the search api
    const responseSearch = await fetch(
      `https://travel-advisor.p.rapidapi.com/locations/search?query=${city}%20${region}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`,
      options
    );
    // searched location is then used to get the info for the location id
    const dataSearch = await responseSearch.json();
    const searchedLocation = dataSearch.data[0].result_object.location_id;
    // look up hotel by the seached location
    const responseHotels = await fetch(
      `https://travel-advisor.p.rapidapi.com/hotels/list?location_id=${searchedLocation}&adults=1&rooms=1&nights=2&offset=0&currency=USD&order=asc&limit=30&sort=recommended&lang=en_US`,
      options
    );

    // search data is sued to get the location for each hotel
    const dataHotels = await responseHotels.json();
    const hotelsData = dataHotels.data;
    const hotelsCardData = await hotelsData
      .filter((data) => data.name)
      .map((data) => {
        const hotels = {
          name: data.name,
          location: data.location_string,
          image: data.photo?.images.thumbnail.url ?? noPhoto,
          price: data.price ? data.price : "Price Not Available",
          rating: data.rating ? data.rating : "Price Not Available",
          ranking: data.ranking ? data.ranking : "Price Not Available",
          tripAdvisorUrl: data.business_listings?.mobile_contacts[0]?.value
            ? data.business_listings.mobile_contacts
            : `https://www.tripadvisor.com/Search?q=${data.name}&search`,
        };
        return hotels;
      });
    state.searchHotels.hotels = hotelsCardData;
    return state.searchHotels.hotels;
  } catch (err) {
    console.error(err);
  }
};

// ----- HOTELS    PAGINATION ----- //
export const getHotelsPage = (page = state.searchHotels.page) => {
  state.searchHotels.page = page;

  const start = (page - 1) * state.searchHotels.resultsPerPanel;
  const end = page * state.searchHotels.resultsPerPanel;
  return state.searchHotels.hotels.slice(start, end);
};

const saveToLocalStorage = () => {
  localStorage.setItem('saved', JSON.stringify(state.saved))
}

export const addToSaved = (item) => {
  state.saved.push(item)
}
const displaySaves = () => {
  const storage = localStorage.getItem('saved')
  if(storage) state.bookmarks = JSON.parse(storage)
}
displaySaves()