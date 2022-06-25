import View from "../View";
import { LOAD_CURRENT_WEATHER } from "../../config";

class AttractionsView extends View {
  _data;
  _parentElement = document.getElementById("attractions-panel--content");
  _childElement = document.getElementById("attractions");
  _nextBtn = document.querySelector(".att-next-button");
  _previousBtn = document.querySelector(".att-previous-button");

  _renderAttractions(data) {
    const loadData = () => {
      this._clearChild();
      this._data = data;
      const renderAttractions = this._data
        .map((data) => {
          data.isClosed ? "Open" : "Closed";
          const attractionsCard = this._generateMarkup(data);
          return attractionsCard;
        })
        .join("");
      this._childElement.insertAdjacentHTML("afterbegin", renderAttractions);
    };
    setTimeout(loadData, LOAD_CURRENT_WEATHER);
  }
  _generateMarkup(data) {
    return `<div class="attractions-content--2">
        <div class="attractions-cards flex">
            <div class="attractions-photo">
                <img src="${data.image}"
                    alt="attractions photo">
            </div>
            <div class="attractions-info--container flex">
                <div class="attractions-info--1">
                  <div><span> ${data.location} </span></div>
                    <div><span> ${data.type} </span></div>
                    <div><span>
                            <Address> ${data.address.join(", ")} </Address>
                        </span></div>
                            <div> <span> ${
                              data.isClosed ? "Open" : "Closed"
                            } </span> </div>
                </div>
                <div class="attractions-info--2 flex">
                    <div> <span> Save ❤ </span> </div>
                    <div> <span> <a href="${
                      data.websiteUrl
                    }.replace"> More Info 🌐 </a> </span> </div>
                </div>
            </div>
        </div>
    </div>
    `;
  }
}

export default new AttractionsView();
