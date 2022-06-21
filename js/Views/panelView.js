import { LOAD_ON_CLICK } from "../config";
import View from "./View";
import sunLoader from "url:../../imgs/sun.gif";
import { relativeTimeThreshold } from "moment";

class PanelView extends View {
  _forcastPanel = document.getElementById("forcast-panel");
  _attractionsPanel = document.getElementById("forcast-panel");
  _historyPanel = document.getElementById("forcast-panel");
  _loaderPanel = document.getElementById("loader-panel")

  clearForcast() {
    this._loaderPanel.classList.remove('hidden')
    this._forcastPanel.style.opacity = 0
    this.renderSunLoader()
    const addHidden = () => {
        this._loaderPanel.classList.add("hidden");
        this._loaderPanel.innerHTML = ''
    }
    const reappear = () => this._forcastPanel.style.opacity = 100
    setTimeout(reappear, LOAD_ON_CLICK)
    setTimeout(addHidden, LOAD_ON_CLICK)
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
