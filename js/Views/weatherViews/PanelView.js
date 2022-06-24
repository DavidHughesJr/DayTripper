import { LOAD_ON_CLICK } from "../../config";
import View from "../View";
import sunLoader from "url:../../../imgs/sun.gif";
import { LOAD_CURRENT_WEATHER } from "../../config";

class PanelView extends View {
  _parentElement = document.getElementById("panel-selectors");
  // panel selectors
  _tabContent = document.querySelectorAll(".map-panel--content");
  // panel selectors
  _tabSelectors = document.querySelectorAll(".button-panel--selectors");
  _forcastPanelSelector = document.getElementById("forcast-panel--selector");
  _attractionsPanelSelector = document.getElementById(
    "attractions-panel--selector"
  );
  _resturantsPanelSelector = document.getElementById(
    "resturants-panel--selector"
  );
  _hotelsPanelSelector = document.getElementById("hotels-panel--selector");
  //panel content
  _forcastPanelContent = document.getElementById("forcast-panel--content");
  _attractionsPanelContent = document.getElementById(
    "attractions-panel--content"
  );
  _resturantsPanelContent = document.getElementById(
    "resturants-panel--content"
  );
  _hotelsPanelContent = document.getElementById("hotels-panel--content");
  // loader
  _loaderPanel = document.getElementById("loader-panel");

  _showPanelContent() {
    this._tabSelectors.forEach((tab) => {
      this._tabContent.forEach((content) => {
        tab.addEventListener("click", (e) => {
          if (e.target === this._forcastPanelSelector) {
            content.classList.add("hidden");
            this._forcastPanelSelector.classList.add("active-panel");
            this._forcastPanelContent.classList.remove("hidden");
          } else (this._forcastPanelSelector.classList.remove("active-panel"))
          if (e.target === this._attractionsPanelSelector) {
            content.classList.add("hidden");
            this._attractionsPanelSelector.classList.add("active-panel");
            this._attractionsPanelContent.classList.remove("hidden");
          } else this._attractionsPanelSelector.classList.remove("active-panel");
          if (e.target === this._resturantsPanelSelector) {
            content.classList.add("hidden");
            this._resturantsPanelSelector.classList.add("active-panel");
            this._resturantsPanelContent.classList.remove("hidden");
          } else (this._resturantsPanelSelector.classList.remove("active-panel"))
          if (e.target === this._hotelsPanelSelector) {
            content.classList.add("hidden");
            this._hotelsPanelSelector.classList.add("active-panel");
            this._hotelsPanelContent.classList.remove("hidden");
          } else (this._hotelsPanelSelector.classList.remove("active-panel"))
        });
      });
    });
  }

  _showPanelSelectors() {
    this._parentElement.classList.remove("hidden");
  }
  clearForcast() {
    this._loaderPanel.classList.remove("hidden");
    this._forcastPanelContent.style.opacity = 0;
    this.renderSunLoader();
    const addHidden = () => {
      this._loaderPanel.classList.add("hidden");
      this._loaderPanel.innerHTML = "";
    };
    const reappear = () => (this._forcastPanelContent.style.opacity = 100);
    setTimeout(reappear, LOAD_ON_CLICK);
    setTimeout(addHidden, LOAD_ON_CLICK);
  }
  renderSunLoader() {
    const markup = `
      <div>
        <img src="${sunLoader}" alt="loading-sun-images">
     </div>
    `;
    this._loaderPanel.insertAdjacentHTML("afterbegin", markup);
  }
}

const money = new PanelView();

money._showPanelContent();

export default new PanelView();
