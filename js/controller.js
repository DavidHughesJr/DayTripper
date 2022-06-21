import mapboxgl from "mapbox-gl";
import * as model from "./model";
import View from "./Views/View";
import CurrentWeatherView from "./Views/weatherViews/CurrentWeatherView";
import hourlyWeatherView from "./Views/weatherViews/hourlyWeatherView";
import HourlyWeatherView from "./Views/weatherViews/hourlyWeatherView";
import WeeklyWeatherView from "./Views/weatherViews/weeklyWeatherView";
import AstroWeatherView from "./Views/weatherViews/astroWeatherView";
import PanelView from "./Views/panelView";


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
      const hourlyData = model.state.hourlyWeather;
      const weeklyData = model.state.weeklyWeather;
      const astroData = model.state.astroWeather; 


      // render data with related method // 
      PanelView._showPanelSelectors()
      CurrentWeatherView._renderLocalWeather(data);
      HourlyWeatherView._renderHourlyWeather(hourlyData);
      WeeklyWeatherView._renderWeeklyWeather(weeklyData);
      AstroWeatherView._renderAstroWeather(astroData)
      
      
    } catch (err) {
      console.error(err.message);
    }
  };
  // Controls all information that will be displayed on a map click //
  const controlInformationOnMapClick = async () => {
    try {
      map.on("click", async (event) => {
        const currentData = await model.loadWeather(
          event.lngLat.lat,
          event.lngLat.lng
        );
        const hourlyData = model.state.hourlyWeather;
        const weeklyData = model.state.weeklyWeather;
        const astroData = model.state.astroWeather;
          console.log(astroData);

        // render a loader 
       PanelView.clearForcast()
        // load information again on map click // 
        CurrentWeatherView.render(currentData);
        HourlyWeatherView._renderHourlyWeather(hourlyData);
        WeeklyWeatherView._renderWeeklyWeather(weeklyData);
        AstroWeatherView._renderAstroWeather(astroData);
        PanelView._togggleBetweenFehrenAndCelsuis();
      });
    } catch (error) {
      console.error(err);
    }
  };
  // controls all information that will be displayed on current location //
  const initMap = async () => {
    controlExtentions(); // controls all extentions connected to the map
    CurrentWeatherView.addHandlerRender(controlLocalWeather);
    CurrentWeatherView.addHandlerRender(controlInformationOnMapClick);
  };
  initMap();
};
