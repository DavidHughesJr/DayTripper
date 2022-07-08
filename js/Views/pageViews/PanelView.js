import { LOAD_ON_CLICK } from "../../config";
import View from "../View";
import sunLoader from "url:../../../imgs/sun.gif";

class PanelView extends View {
  _parentElement = document.getElementById("panel-selectors");
  // panel selectors
  _tabContent = document.querySelectorAll(".map-panel--content");
  // panel selectors
  _tabSelectors = document.querySelectorAll(".button-panel--selectors");
  _forecastPanelSelector = document.getElementById("forcast-panel--selector");
  _attractionsPanelSelector = document.getElementById(
    "attractions-panel--selector"
  );
  _restaurantsPanelSelector = document.getElementById(
    "restaurants-panel--selector"
  );
  _hotelsPanelSelector = document.getElementById("hotels-panel--selector");
  //panel content
  _forecastPanelContent = document.getElementById("forcast-panel--content");
  _attractionsPanelContent = document.getElementById(
    "attractions-panel--content"
  );
  _restaurantsPanelContent = document.getElementById(
    "restaurants-panel--content"
  );
  _hotelsPanelContent = document.getElementById("hotels-panel--content");
  // loader
  _loaderPanel = document.getElementById("loader-panel");
  _mapPanelContent = document.querySelectorAll(".map-panel--content");
  _map = document.getElementById("map");
  _panelClearer = document.querySelectorAll(".clear-panel--click");
  _hourlyContainer = document.querySelector(".hourly-slider--container");

  _showPanelContent() {
    this._tabSelectors.forEach((tab) => {
      this._tabContent.forEach((content) => {
        tab.addEventListener("click", (e) => {
          if (e.target === this._forecastPanelSelector) {
            content.classList.add("hidden");
            this._forecastPanelSelector.classList.add("active-panel");
            this._forecastPanelContent.classList.remove("hidden");
          } else this._forecastPanelSelector.classList.remove("active-panel");
          if (e.target === this._attractionsPanelSelector) {
            content.classList.add("hidden");
            this._attractionsPanelSelector.classList.add("active-panel");
            this._attractionsPanelContent.classList.remove("hidden");
          } else
            this._attractionsPanelSelector.classList.remove("active-panel");
          if (e.target === this._restaurantsPanelSelector) {
            content.classList.add("hidden");
            this._restaurantsPanelSelector.classList.add("active-panel");
            this._restaurantsPanelContent.classList.remove("hidden");
          } else
            this._restaurantsPanelSelector.classList.remove("active-panel");
          if (e.target === this._hotelsPanelSelector) {
            content.classList.add("hidden");
            this._hotelsPanelSelector.classList.add("active-panel");
            this._hotelsPanelContent.classList.remove("hidden");
          } else this._hotelsPanelSelector.classList.remove("active-panel");
        });
      });
    });
  }

  _showPanelSelectors() {
    this._parentElement.classList.remove("hidden");
  }
  clearPanelOnLoad() {
    window.addEventListener("load", () => {
      this._panelClearer.forEach((panel) => {
        const markup = `
      <div class='loader-panel--container flex'>
        <img src="${sunLoader}" alt="loading-sun-images">
     </div>
    `;
        panel.innerHTML = "";
        panel.style.position = "relative";
        this._hourlyContainer.style.justifyContent = "center";
        panel.insertAdjacentHTML("afterbegin", markup);
      });
    });
  }
  clearPanel() {
    map.addEventListener("click", () => {
      this._panelClearer.forEach((panel) => {
        const markup = `
      <div class='loader-panel--container flex'>
        <img src="${sunLoader}" alt="loading-sun-images">
     </div>
    `;
        panel.innerHTML = "";
        panel.style.position = "relative";
        this._hourlyContainer.style.justifyContent = "center";
        panel.insertAdjacentHTML("afterbegin", markup);
      });
    });
  }
  renderSunLoader() {
    const markup = `
      <div class="sun-loader">
        <img src="${sunLoader}" alt="loading-sun-images">
     </div>
    `;
    this._mapPanelContent.forEach((panel) =>
      panel.insertAdjacentElement("afterbegin", markup)
    );
  }
}

const money = new PanelView();

money._showPanelContent();

export default new PanelView();
