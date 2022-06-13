import mapboxgl from "mapbox-gl";
import * as model from "./model";
import CurrentWeatherView from "./Views/weatherViews/CurrentWeatherView";
import HourlyWeatherView from "./Views/weatherViews/hourlyWeatherView";

mapboxgl.accessToken = `pk.eyJ1IjoiZGF2aWRodWdoZXNqciIsImEiOiJjbDN6dmw0bmQwOWw4M2lwOGp5OXJ2Z242In0.MV-26g2_0GnW_PDgaRGY_g`;

// SUCCESSFUL GEOLOCATION
const successLocal = (position) => {
  generateMap([position.coords.longitude, position.coords.latitude]);
};
// ERROR IN GEOLOCATION
const errLocal = (err) => {
  // REALTIME ERR HANDLING ///=> ATTENTION
  console.error(err);
};
navigator.geolocation.getCurrentPosition(successLocal, errLocal, {
  enableHighAccuracy: true,
});
// CREATING MAP WITH MAPBOX  GETTING CURRENT POSITION //
const generateMap = async (local) => {
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: local, // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
  const controlExtentions = () => {
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-left");
  };
  const controlLocalWeather = async () => {
    CurrentWeatherView.renderSunLoader();
    try {
      // generate local weather on page load //
      const data = await model.loadWeather(local[1], local[0]);
      CurrentWeatherView.renderLocalWeather(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const controlWeather = async () => {
    try {
      map.on("click", async (event) => {
        const data = await model.loadWeather(
          event.lngLat.lat,
          event.lngLat.lng
        );
        CurrentWeatherView.render(data);
      });
    } catch (error) {
      console.error(err);
    }
  };
  const controlLocalHourly = async () => {
    try {
      const localWeather = await model.loadWeather(local[1], local[0]);
      const data = model.state.hourlyWeather;
      HourlyWeatherView.renderHourlyWeather(data); 
    } catch (err) {
      console.log(err.message);
    }
  };
  const initMap = async () => {
    CurrentWeatherView.addHandlerRender(controlLocalWeather);
    CurrentWeatherView.addHandlerRender(controlWeather);
    CurrentWeatherView.addHandlerRender(controlExtentions);
    HourlyWeatherView.addHandlerRender(controlLocalHourly);
  };
  initMap();
};

// ELEMENTS CONTROLLED OUTSIDE OF THE MAPS INFORMATION //