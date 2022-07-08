import { LOAD_CURRENT_PANEL } from "../../config";
import View from "../View";
import { NO_SAVED_RESTAURANTS } from "../../config";

class RestaurantsView extends View {
  _childElement = document.getElementById("restaurants");
  _confirmSaveContainer = document.getElementById("confirm-save");
  _confirmDeleteContainer = document.getElementById("confirm-delete");
  _savedRestaurantsContainer = document.getElementById("saved-restaurants");
  _overlay = document.getElementById("confirmation-overlay");
  _yesSaveBtn = document.getElementById("yes-save--btn");
  _noSaveBtn = document.getElementById("no-save--btn");
  _yesDeleteBtn = document.getElementById("yes-delete--btn");
  _noDeleteBtn = document.getElementById("no-delete--btn");
  _allButtons = document.getElementsByName("button");
  _key = "restaurants";
  _savedRestaurants = localStorage.getItem(this._key);

  _renderRestaurants(data) {
    this._data = data;
    this._clearChild();
    const loadData = () => {
      const renderRestaurants = this._data.map((data) => {
        data.isClosed ? "Open" : "Closed";
        const restaurantCard = this._generateMarkup(data);

        return restaurantCard;
      }).join('');
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
                            <div class="trip-link"> <span> <a href="${
                              data.tripAdvisorUrl
                            }"> More Info 🌐 </a> </span> </div>
                            <div> <button class="save-button">  Save ❤  </button> </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
  }
  addToSavedRestaurants() {
    this._childElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".save-button");
      if (!btn) return;
      // get saves container
      const itemToSave = e.target.closest(".panel-cards");
      // confirmation container & overlay to ask if item should be saved
      this._confirmSaveContainer.classList.remove("hidden");
      this._overlay.classList.add("wait-confirmation");
      // clone div so current item that is clicked doesnt get removed
      let newSaves = itemToSave.cloneNode(true);

      // add save button listener
      this._yesSaveBtn.addEventListener("click", () => {
        if (
          (this._savedRestaurantsContainer.innerHTML = NO_SAVED_RESTAURANTS)
        ) {
          this._savedRestaurantsContainer.innerHTML = "";
        }
        this._savedRestaurantsContainer.appendChild(newSaves);

        // define key and value to check in local storage
        localStorage.setItem(
          this._key,
          this._savedRestaurantsContainer.innerHTML
        );
        this._overlay.classList.remove("wait-confirmation");
        this._confirmSaveContainer.classList.add("hidden");
      });

      // add no button listner
      this._noSaveBtn.addEventListener("click", () => {
        newSaves = "";
        this._overlay.classList.remove("wait-confirmation");
        this._confirmSaveContainer.classList.add("hidden");
      });
    });
  }
  showSaved() {
    if (this._savedRestaurants) {
      this._savedRestaurantsContainer.insertAdjacentHTML(
        "afterbegin",
        this._savedRestaurants
      );
    } else if ((this._savedRestaurantsContainer.innerHTML = " ")) {
      this._savedRestaurantsContainer.innerHTML = NO_SAVED_RESTAURANTS
    }
  }
  deleteSaves() {
    this._savedRestaurantsContainer.addEventListener("dblclick", (e) => {
      const itemToDelete = e.target.closest(".panel-cards");
      this._confirmDeleteContainer.classList.remove("hidden");
      this._overlay.classList.add("wait-confirmation");
      // add delete button listener
      this._yesDeleteBtn.addEventListener("click", () => {
        // delete to item that was dblclicked
        this._savedRestaurantsContainer.removeChild(itemToDelete);
        // update local storage to new HTML , use same key to override //
        localStorage.setItem(
          this._key,
          this._savedRestaurantsContainer.innerHTML
        );
        this._overlay.classList.remove("wait-confirmation");
        this._confirmDeleteContainer.classList.add("hidden");
        this._savedRestaurantsContainer.remove(itemToDelete);
      });
      // add no button listner
      this._noDeleteBtn.addEventListener("click", () => {
        this._overlay.classList.remove("wait-confirmation");
        this._confirmDeleteContainer.classList.add("hidden");
      });
    });
  }
  addHandlerSaves(handler) {
    handler();
  }
}

export default new RestaurantsView();
