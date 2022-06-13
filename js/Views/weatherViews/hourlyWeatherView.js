import View from "../View";
import rain from "url:../../../imgs/raindrop.png"
import { LOAD_CURRENT_WEATHER } from "../../config";
import moment from "moment";


class HourlyWeatherView extends View {
  _parentElement = document.getElementById("hourly-panel");
  _childrenElements = document.querySelectorAll(".hourly-content");
  _arrowRight = document.getElementById("arrow-right");
  _arrowLeft = document.getElementById("arrow-left");

  renderHourlyWeather(data) {
   const loadData = () => {
        this._data = data;
        this._clear();
       const renderHourly = data.map((data, i) => {

      const hourly = this._generateMarkup(data);
      return hourly
    });
        this._parentElement.insertAdjacentHTML("afterbegin", renderHourly);
    }
    setTimeout(loadData, LOAD_CURRENT_WEATHER)
  }
  _generateMarkup(data) {
console.log(moment(data.hour).format('LT'));
    return `<div class="hourly-content">
            <div class="hourly-chart flex">
                <span class="hourly-chart--time"> ${moment(data.hour).format('LT')}</span>
                <span> <img class="hourly-weather--icon" src="${data.img}"
                        alt="Hourly Weather Logo"></span>
                <span class="fahren"> ${data.degreeF}</span>
                <span class="celsius hidden"> ${data.degreeC}</span>
                <div class="hourly-rain--container">
                    <img src="${rain}" alt="rain image"><span> ${data.rainChance}</span>
                </div>
            </div>
        </div>`;
  }
}

export default new HourlyWeatherView()