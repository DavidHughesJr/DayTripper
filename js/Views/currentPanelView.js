import Views from "./View";
import { LOAD_CURRENT_WEATHER } from "../config";
import sunLoader from "url:../../imgs/sun.gif";
// tester 

class currentPanelView extends Views {
  _parentElement = document.getElementById("current-panel");

  renderSunLoader() {
    const markup = `
      <div id="render-icons--center">
        <img src="${sunLoader}" alt="loading-sun-images">
     </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderLocalWeather(data) {
    const loadData = ()=> {
        this._data = data;
        this._clear();
        const html = this._generateMarkup();
        this._parentElement.insertAdjacentHTML("afterbegin", html);
    }
    setTimeout(loadData, LOAD_CURRENT_WEATHER)
  }
  addHandlerRender(handler) {
    handler();
  }
  _generateMarkup() {
    return ` 
    <div class="current-temp-container flex">
      <div id="current-temp-f"> <span> ${this._data.currentWeatherF}</span> </div>
      <div id="current-temp-c" class="celsius hidden"> <span> ${this._data.currentWeatherC} </span> </div>
      <button class="temp degree"> °F </button> <button class="temp degree"> °C </button>
      <div id="current-icon">
          <img src="${this._data.currentImage}" alt="Weather-icon" />
      </div>
    </div>
    <div id="location-name"> <span> ${this._data.currentCity} , ${this._data.currentState}</span></div>
    <div class="local-time--container flex">
        <div id="local-time"> <span>${this._data.currentTime}</span></div>
        <div id="feelslike-f">
          <span> ${this._data.currentCondition} Feels Like ${this._data.feelsLikeF}°F </span>
      </div>
      <div id="feelslike-c celsius" class="hidden">
          <span> ${this._data.currentCondition}Feels Like ${this._data.feelsLikeC}°C </span>
      </div>
      <div class="high-low--content">
          <span> ${this._data.currentHighF}°F Low ${this._data.currentLowF}°F</span>
      </div>
      <div class="high-low--content celsius hidden">
          <span> High ${this._data.currentHighC}°C ${this._data.currentLowC}°C</span>
      </div>
  </div>`;
  }
}

export default new currentPanelView();
