import sunLoader from "url:../../imgs/sun.gif";
import { LOAD_CURRENT_WEATHER } from "../config";

export default class Views {
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
     celsiusButton.addEventListener('click', () => {
      celsius.forEach(degree => degree.classList.toggle('hidden'))
      fahren.forEach((degree) => degree.classList.toggle("hidden"));
     })
     fahrenButton.addEventListener("click", () => {
       fahren.forEach((degree) => degree.classList.toggle("hidden"));
       celsius.forEach((degree) => degree.classList.toggle("hidden"));
     });


      console.log(celsius);
      console.log(fahren);
      console.log(celsiusButton);
      console.log(fahrenButton);
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
