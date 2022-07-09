import mapboxgl, { Marker } from "mapbox-gl";
import * as model from "./model";
import View from "./Views/View";

import HourlyWeatherView from "./Views/weatherViews/HourlyWeatherView";
import WeeklyWeatherView from "./Views/weatherViews/WeeklyWeatherView";
import AstroWeatherView from "./Views/weatherViews/AstroWeatherView";
import PanelView from "./Views/pageViews/PanelView";
import pageView from "./Views/pageViews/pageView";
import AttractionsView from "./Views/attractionViews/attractionsView";
import AttractionsPaginationView from "./Views/attractionViews/attractionsPagination";
import RestaurantsView from "./Views/restaurantsViews/restaurantsView";
import RestaurantsPaginationView from "./Views/restaurantsViews/restaurantsPaginationView";
import HotelsView from "./Views/hotelView/hotelsView";
import HotelsPaginationView from "./Views/hotelView/hotelsPaginationView";

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
  const controlExtensions = () => {
    const nav = new mapboxgl.NavigationControl();
    const localMarker = new mapboxgl.Marker({ color: "#b40219" });
    map.addControl(nav, "top-left");
    localMarker.setLngLat(local).addTo(map);
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
      PanelView._showPanelSelectors();
      CurrentWeatherView._renderLocalWeather(data);
      HourlyWeatherView._renderHourlyWeather(hourlyData);
      WeeklyWeatherView._renderWeeklyWeather(weeklyData);
      AstroWeatherView._renderAstroWeather(astroData);
    } catch (err) {
      console.error(err.message);
    }
  };
  const controlLocalAttractions = async () => {
    PanelView.clearPanelOnLoad()
    try {
      await model.loadAttractions(local[1], local[0]);

      AttractionsView._renderAttractions(model.getAttractionsPage());
      // render pagination
      AttractionsPaginationView.render(model.state.searchAttractions);
    } catch (err) {
      console.log(err);
    }
  };
  const controlAttractionsPagination = (goToPage) => {
    // render more or past results
    AttractionsView._renderAttractions(model.getAttractionsPage(goToPage));
    // render pagination
    AttractionsPaginationView.render(model.state.searchAttractions);
  };
  const controlLocalRestaurants = async () => {
    PanelView.clearPanelOnLoad()
    try {
      await model.loadRestaurants(local[1], local[0]);
      RestaurantsView._renderRestaurants(model.getRestaurantsPage());
      RestaurantsPaginationView.render(model.state.searchRestaurants);
    } catch (err) {
      console.error(err);
    }
  };
  const controlRestaurantsPagination = (goToPage) => {
    RestaurantsView._renderRestaurants(model.getRestaurantsPage(goToPage));
    RestaurantsPaginationView.render(model.state.searchHotels);
  };
  const controlLocalHotels = async () => {
    PanelView.clearPanelOnLoad();
    try {
      const dataForSearchedLocation = await model.loadWeather(
        local[1],
        local[0]
      );
      const city = dataForSearchedLocation.currentCity;
      const region = dataForSearchedLocation.currentState;

      await model.loadHotels(city, region);

      HotelsView._renderHotels(model.getHotelsPage());

      HotelsPaginationView.render(model.state.searchHotels);
    } catch (err) {
      console.error(err);
    }
  };
  const controlHotelsPagination = (goToPage) => {
    HotelsView._renderHotels(model.getHotelsPage(goToPage));
    HotelsPaginationView.render(model.state.searchHotels);
  };
  // Controls all information that will be displayed on a map click //
  const controlInformationOnMapClick = async () => {
    PanelView.clearPanel();
    const clickedMarker = new mapboxgl.Marker();
    try {
      map.on("click", async (event) => {
        // add marker
        const coordinates = event.lngLat;
        clickedMarker.setLngLat(coordinates).addTo(map);
        // render a loader
        const currentData = await model.loadWeather(
          event.lngLat.lat,
          event.lngLat.lng
        );
        const hourlyData = model.state.hourlyWeather;
        const weeklyData = model.state.weeklyWeather;
        const astroData = model.state.astroWeather;

        // data needed for att restaurants and hotels
        const city = currentData.currentCity;
        const region = currentData.currentState;
        await model.loadHotels(city, region);

        // load information again on map click //
        CurrentWeatherView.render(currentData);
        HourlyWeatherView._renderHourlyWeather(hourlyData);
        WeeklyWeatherView._renderWeeklyWeather(weeklyData);
        AstroWeatherView._renderAstroWeather(astroData);
        AttractionsView._renderAttractions(model.getHotelsPage(1));
        AttractionsPaginationView.render(model.state.searchAttractions);
        RestaurantsView._renderRestaurants(model.getHotelsPage(1));
        RestaurantsPaginationView.render(model.state.searchRestaurants);
        HotelsView._renderHotels(model.getHotelsPage(1));
        HotelsPaginationView.render(model.state.searchHotels);
      });
    } catch (error) {
      console.error(err);
    }
  };
  const controlAttractionsSaves = () => {
    AttractionsView.showSaved();
    AttractionsView.addToSavedAttractions();
    AttractionsView.deleteSaves();
  };
  const controlRestaurantsSaves = () => {
    RestaurantsView.showSaved();
    RestaurantsView.addToSavedRestaurants();
    RestaurantsView.deleteSaves();
  };
  const controlHotelsSaves = () => {
    HotelsView.showSaved();
    HotelsView.addToSavedHotels();
    HotelsView.deleteSaves();
  };
  // controls all information that will be displayed on current location //
  const initMap = async () => {
    // controlExtensions(); // controls all extensions connected to the map
    CurrentWeatherView.addHandlerRender(controlLocalWeather);
    CurrentWeatherView.addHandlerRender(controlInformationOnMapClick);
    // AttractionsView.addHandlerRender(controlLocalAttractions);
    // AttractionsPaginationView.addHandlerClick(controlAttractionsPagination);
    // AttractionsView.addHandlerSaves(controlAttractionsSaves);
    // RestaurantsView.addHandlerRender(controlLocalRestaurants);
    // RestaurantsPaginationView.addHandlerClick(controlRestaurantsPagination)
    // RestaurantsView.addHandlerSaves(controlRestaurantsSaves);
    // HotelsView.addHandlerRender(controlLocalHotels);
    // HotelsPaginationView.addHandlerClick(controlHotelsPagination);
    // HotelsView.addHandlerSaves(controlHotelsSaves);
  };
  initMap();
};

const navBarFunctionality = () => {
  pageView.toggleMobileMenu();
  pageView.enableStickyNav();
};
const init = () => {
  pageView.addHandlerEnable(navBarFunctionality);
};
init();
