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
       const renderHourly = this._data.map((data, i) => {

      const hourly = this._generateMarkup();
      return hourly
    });
        this._parentElement.insertAdjacentHTML("afterbegin", renderHourly);
    }
    setTimeout(loadData, LOAD_CURRENT_WEATHER)
  }
  _generateMarkup() {
    return `<div class="hourly-content">
            <div class="hourly-chart flex">
                <span class="hourly-chart--time"> ${moment(this._data.hour).format('LT')}</span>
                <span> <img class="hourly-weather--icon" src="${this._data.img}"
                        alt="Hourly Weather Logo"></span>
                <span class="fahren"> ${this._data.degreeF}</span>
                <span class="celsius hidden"> ${this._data.degreeC}</span>
                <div class="hourly-rain--container">
                    <img src="${rain}" alt="rain image"><span> ${this._data.rainChance}</span>
                </div>
            </div>
        </div>`;
  }
  _enableHourlySlider(){
    console.log(this._childrenElements);
  }
}

export default new HourlyWeatherView()