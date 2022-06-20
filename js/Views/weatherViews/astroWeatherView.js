import View from "../View";
import rain from "url:../../../imgs/raindrop.png";
import sun from "url:../../../imgs/sun-uv.png";
import sun from "url:../../../imgs/wind.png";

class AstroWeatherView extends View {
  _parentElement = document.getElementById("astro-panel");

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
        <div class="uv-content"> <img src="imgs/sun-uv.png" alt="sunrise img">
            <div> <span> UV index </span> <span> Low </span>
            </div>
        </div>
        <div class="wind-content"> <img src="imgs/wind.png" alt="">
            <div>
                <span> Wind</span> <Span> 6mph </Span> </div>
        </div>

        <div class="humidity-content"> <img src="imgs/raindrop.png" alt="sunrise img">
            <div class="humidity"> <span> Humidity </span> <span> 60% </span>
            </div>
        </div>
    </div>
    <div class="sunrise-sunset--content flex">
        <div class="sunrise">
            <img src="//cdn.weatherapi.com/weather/64x64/day/113.png" alt="sunrise img">
            <div> <span>Sunrise 5:04AM</span></div>
        </div>
        <div class="sunset">
            <img src=" imgs/night.webp" alt="sunset img">
            <div>
                <span>Sunset 8:04PM</span>
            </div>
        </div>
    </div>
    <div class="more-weather--info">
        <h3> More information </h3>
        <div class="more-weather--content flex">
            <span class="fahren "> Heat index 97°F</span>
            <span class="celsius hidden"> 70.3°C</span>
            <span class="fahren "> Dew point 69.4°F</span>
            <span class="celsius hidden"> Dew Point 20.8,°C</span>
            <span> Chance of snow 0%</span>
        </div>
    </div> `;
  }
}