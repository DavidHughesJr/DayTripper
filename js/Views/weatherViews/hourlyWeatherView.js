import View from "../View";
import rain from "url:../../../imgs/raindrop.png";
import { LOAD_CURRENT_WEATHER } from "../../config";
import moment from "moment";

class HourlyWeatherView extends View {
  _parentElement = document.getElementById("hourly-panel");
  _sliderContent = document.getElementById("hourly-panel--content");
  _sliderElements = document.querySelectorAll(".hourly-chart");

  _renderHourlyWeather(data) {
    const loadData = () => {
      this._data = data;
      this._clear();
      const renderHourly = this._data.map((data, i) => {
        const hourly = this._generateMarkup(data);
        return hourly
        // add join('') to remove commas 
      }).join('');
      this._parentElement.insertAdjacentHTML("afterbegin", renderHourly);
        // create grabbing slider affect to hourly content // 


        
    };
    setTimeout(loadData, LOAD_CURRENT_WEATHER);
  }
  _generateMarkup(data) {
   return ` <div class="hourly-chart flex">
      <span class="hourly-chart--time"> ${moment(data.hour).format("LT")}</span>
      <span> <img class="hourly-weather--icon" src="${data.img}"
              alt="hourly weather logo"></span>
      <span class="fahren"> ${data.degreeF}</span>
      <span class="celsius hidden"> ${data.degreeC}</span>
      <div class="hourly-rain--container">
          <img src="${rain}" alt="rain image"><span> ${data.rainChance}</span>
      </div>
      </div>`;
  }
}

export default new HourlyWeatherView();

