import { LOAD_CURRENT_PANEL } from "../../config";
import View from "../View";

class RestaurantsView extends View {
  _childElement = document.getElementById("restaurants");

  _renderRestaurants(data) {
    this._data = data;
    this._clearChild();
    console.log(data);
    const loadData = () => {
      const renderRestaurants = this._data.map((data) => {
        data.isClosed ? "Open" : "Closed";
        const restaurantCard = this._generateMarkup(data);

        return restaurantCard;
      });
      this._childElement.insertAdjacentHTML("afterbegin", renderRestaurants);
    };
    setTimeout(loadData, LOAD_CURRENT_PANEL);
  }

  _generateMarkup(data) {
    return `<div class="panel-content--2">
                <div class="panel-cards flex">
                    <div class="panel-photo">
                        <img src="${data.image}"
                            alt="restaurants photo">
                    </div>
                    <div class="panel-info--container flex">
                        <div class="panel-info--1">
                            <div><span> ${data.name} </span></div>
                             <div><span> ${data.rating} out of 5 </span></div>
                             <div> <span> ${data.price} </span> </div>
                            <div><span>
                                    <Address> ${data.location} </Address>
                                </span></div>
                            <div> <span> ${
                              data.isClosed ? "Closed" : "Open"
                            } </span> </div>
                        </div>
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

export default new RestaurantsView();
