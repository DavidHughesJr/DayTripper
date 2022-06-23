import sunLoader from "url:../../imgs/sun.gif";
import { LOAD_CURRENT_WEATHER } from "../config";

export default class View {
  render(data) {
    this._data = data;
    const html = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  renderChild(data) {
    this._data = data;
    const html = this._generateMarkup();
    this._clear();
    this._childElement.insertAdjacentHTML("afterbegin", html);
  }
  addHandlerRender(handler) {
    handler();
  }
  _togggleBetweenFahrenAndCelsuis() {
    const loadData = () => {
      const celsiusButton = document.querySelector("#celsius-button");
      const fahrenButton = document.querySelector("#fahren-button");
      const celsius = document.querySelectorAll(".celsius");
      const fahren = document.querySelectorAll(".fahren");

      // add event listener for buttons
      celsiusButton.addEventListener("click", () => {
        if (celsiusButton.classList.contains("active-degree")) {
          return;
        } else {
          fahrenButton.classList.remove("active-degree");
          celsiusButton.classList.add("active-degree");
          celsius.forEach((degree) => degree.classList.toggle("hidden"));
          fahren.forEach((degree) => degree.classList.toggle("hidden"));
        }
      });
      fahrenButton.addEventListener("click", () => {
        if (fahrenButton.classList.contains("active-degree")) {
          return;
        } else {
          celsiusButton.classList.remove("active-degree");
          fahrenButton.classList.add("active-degree");
          fahren.forEach((degree) => degree.classList.toggle("hidden"));
          celsius.forEach((degree) => degree.classList.toggle("hidden"));
        }
      });
    };
    setTimeout(loadData, LOAD_CURRENT_WEATHER);
  }
  renderSunLoader() {
    const markup = `
      <div id="render-icons--center">
        <img src="${sunLoader}" alt="loading-sun-images">
     </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  _clearChild() {
    this._childElement.innerHTML = "";
  }
}
