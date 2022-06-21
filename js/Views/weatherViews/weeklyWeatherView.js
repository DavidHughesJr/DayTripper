import View from "../View";
import rain from "url:../../../imgs/raindrop.png";
import { LOAD_CURRENT_WEATHER } from "../../config";
import rain from "url:../../../imgs/raindrop.png";
import moment from "moment";


class WeeklyWeatherView extends View {
  _parentElement = document.getElementById("weekly-forcast-container");
  _childElement = document.getElementById("weekly-forcast");


  _renderWeeklyWeather(data) {
    const loadData = () => {
      this._data = data;
      this._clear()
      const renderWeekly = this._data
        .map((weekly) => {
          const newWeekly = this._genderateMarkup(weekly);
          return newWeekly;
        })
        .join("");
      this._parentElement.insertAdjacentHTML("afterbegin", renderWeekly);
    };
     setTimeout(loadData, LOAD_CURRENT_WEATHER);
  }

  _genderateMarkup(data) {
    return `
        <div id="weekly-forcast" class="weekly-forcast--content flex">
        <span class="weekly-forcast--day"> ${moment(data.date).format(
          "ddd"
        )} </span>
        <img src="${data.icon}"
            alt="Current weather chance image">
        <div class="rain-chance flex">
                <div> <span> <img src="${rain}" alt="rain drop image"> ${data.rainChance}%</span> </div>
        </div>
        <div>
        </div>
        <div class="weekly-temp">
            <span class="fahren"> ${data.tempF} °F</span>
            <span class="celsius hidden"> ${data.tempC}°C</span>
        </div>
        </div>
        `;
  }
}


export default new WeeklyWeatherView()