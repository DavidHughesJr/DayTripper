import { LOAD_CURRENT_PANEL } from "../../config";
import View from "../View";

class HotelsView extends View {
  _childElement = document.getElementById("hotels");

  _renderHotels(data) {
    this._data = data;
    this._clearChild();
    console.log(data);
    const loadData = () => {
      const renderHotels = this._data.map((data) => {
        const hotelsCard = this._generateMarkup(data);
        return hotelsCard;
      }).join('');
      this._childElement.insertAdjacentHTML("afterbegin", renderHotels);
    };
    setTimeout(loadData, LOAD_CURRENT_PANEL);
  }

  _generateMarkup(data) {
    return `<div class="panel-content--2">
                <div class="panel-cards flex">
                    <div class="panel-photo">
                        <img src="${data.image}"
                            alt="hotels photo">
                    </div>
                    <div class="panel-info--container flex">
                        <div class="panel-info--1">
                            <div><span> ${data.name} </span></div>
                            <div><span>
                                    <Address> ${data.location} </Address>
                                </span></div>
                            <div> <span> Price: ${
                              data.price
                            } </span> <span> Rating: ${data.rating.replace(".0","")}/5 Stars </span> </div>
                        </div>
                        <div> <span> ${data.ranking} </span></div>
                        <div class="panel-info--2 flex">
                            <div class="panel-info--2 flex">
                            <div> <span> <a href="${
                              data.tripAdvisorUrl
                            }"> <button> More Info 🌐 </button> </a> </span> </div>
                            <div> <button class="save-button">  Save ❤  </button> </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
  }
}

export default new HotelsView();
