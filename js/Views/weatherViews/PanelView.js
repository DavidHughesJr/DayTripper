import { LOAD_ON_CLICK } from "../../config";
import View from "../View";
import sunLoader from "url:../../../imgs/sun.gif" 
import { LOAD_CURRENT_WEATHER } from "../../config";

class PanelView extends View {
  _parentElement = document.getElementById("panel-selectors");
  _forcastPanel = document.getElementById("forcast-panel");
  _attractionsPanel = document.getElementById("forcast-panel");
  _historyPanel = document.getElementById("forcast-panel");
  _loaderPanel = document.getElementById("loader-panel");

  _showPanelSelectors() {
    this._parentElement.classList.remove("hidden");
  }
  clearForcast() {
    this._loaderPanel.classList.remove("hidden");
    this._forcastPanel.style.opacity = 0;
    this.renderSunLoader();
    const addHidden = () => {
      this._loaderPanel.classList.add("hidden");
      this._loaderPanel.innerHTML = "";
    };
    const reappear = () => (this._forcastPanel.style.opacity = 100);
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

export default new PanelView();
