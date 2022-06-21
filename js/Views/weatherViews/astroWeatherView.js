import View from "../View";
import rain from "url:../../../imgs/raindrop.png";
import sun from "url:../../../imgs/sun-uv.png";
import wind from "url:../../../imgs/wind.png";
import { LOAD_CURRENT_WEATHER } from "../../config";

class AstroWeatherView extends View {
  _parentElement = document.getElementById("astro-container");

  _renderAstroWeather(data) {
    const loadData = () => {
      this._data = data;
      this._clear();
      const html = this._generateMarkup();
      this._parentElement.insertAdjacentHTML("afterbegin", html);
    };
    setTimeout(loadData, LOAD_CURRENT_WEATHER);
  }
  _generateMarkup() {
    return `
    <div class="wind-uv--content flex">
        <div class="uv-content"> <img src="${sun}" alt="sunrise img">
            <div> <span> UV Index: </span> <span> ${this._data.uv} </span>
            </div>
        </div>
        <div class="wind-content"> <img src="${wind}" alt="Wind image">
            <div>
                <span> Wind:</span> <Span> ${this._data.wind} mph </Span> </div>
        </div>

        <div class="humidity-content"> <img src="${rain}" alt="sunrise img">
            <div class="humidity"> <span> Humidity: </span> <span> ${this._data.humidity} </span>
            </div>
        </div>
    </div>
    <div class="sunrise-sunset--content flex">
        <div class="sunrise">
            <img src="${this._data.sunImg}" alt="sunrise img">
            <div> <span> Sunrise: ${this._data.sunrise}</span></div>
        </div>
        <div class="sunset">
            <img src="${this._data.setImg}" alt="sunset img">
            <div>
                <span> Sunset: ${this._data.sunset}</span>
            </div>
        </div>
    </div>
    <div class="more-weather--info">
        <h3> More information </h3>
        <div class="more-weather--content flex">
            <span class="fahren "> Heat Index: ${this._data.heatIndexF}°F</span>
            <span class="celsius hidden"> Heat Index: ${this._data.heatIndexC}°C</span>
            <span> Wind Direction: ${this._data.windDirection} </span>
            <span> Chance of Snow: ${this._data.chanceOfSnow}%</span>
        </div>
    </div> `;
  }
}

export default new AstroWeatherView()