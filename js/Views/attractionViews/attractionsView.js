import View from "../View";
import { LOAD_CURRENT_PANEL, NO_SAVED_ATTRACTIONS } from "../../config";
import { NO_SAVED_ATTRACTIONS } from "../../config";

class AttractionsView extends View {
  _data;
  _mapPage = document.getElementById('map-page')
  _parentElement = document.getElementById("attractions-panel--content");
  _childElement = document.getElementById("attractions");
  _nextBtn = document.querySelector(".att-next-button");
  _previousBtn = document.querySelector(".att-previous-button");
  _confirmSaveContainer = document.getElementById("confirm-save");
  _confirmDeleteContainer = document.getElementById("confirm-delete");
  _savedAttractionsContainer = document.getElementById("saved-attractions");
  _overlay = document.getElementById("confirmation-overlay");
  _yesSaveBtn = document.getElementById("yes-save--btn");
  _noSaveBtn = document.getElementById("no-save--btn");
  _yesDeleteBtn = document.getElementById("yes-delete--btn");
  _noDeleteBtn = document.getElementById("no-delete--btn");
  _allButtons = document.getElementsByName("button");
  _key = "attractions";
  _savedAttractions = localStorage.getItem(this._key);

  _renderAttractions(data) {
    const loadData = () => {
      this._clearChild();
      this._data = data;
      const renderAttractions = this._data
        .map((data) => {
          const attractionsCard = this._generateMarkup(data);
          return attractionsCard;
        })
        .join("");
      this._childElement.insertAdjacentHTML("afterbegin", renderAttractions);
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
    `;
  }
  addToSavedAttractions() {
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
        this._savedAttractionsContainer.appendChild(newSaves);

        // define key and value to check in local storage
        localStorage.setItem(
          this._key,
          this._savedAttractionsContainer.innerHTML
        );
        this._overlay.classList.remove("wait-confirmation");
        this._confirmSaveContainer.classList.add("hidden");
      });

      // add no button listener
      this._noSaveBtn.addEventListener("click", () => {
        newSaves = "";
        this._overlay.classList.remove("wait-confirmation");
        this._confirmSaveContainer.classList.add("hidden");
      });
    });
  }
  showSaved() {
    if (this._savedAttractions && document.URL.includes("homepage.aspx")) {
      this._savedAttractionsContainer.insertAdjacentHTML(
        "afterbegin",
        this._savedAttractions
      );
    } else if (this._savedAttractionsContainer.innerHTML = " ") {
      this._savedAttractionsContainer.innerHTML = NO_SAVED_ATTRACTIONS;
    }
  }
  deleteSaves() {
    this._savedAttractionsContainer.addEventListener("dblclick", (e) => {
      const itemToDelete = e.target.closest(".panel-cards");
      this._confirmDeleteContainer.classList.remove("hidden");
      this._overlay.classList.add("wait-confirmation");
      // add delete button listener
      this._yesDeleteBtn.addEventListener("click", () => {
        // delete to item that was dblclicked
        this._savedAttractionsContainer.removeChild(itemToDelete);
        // update local storage to new HTML , use same key to override //
        localStorage.setItem(
          this._key,
          this._savedAttractionsContainer.innerHTML
        );
        this._overlay.classList.remove("wait-confirmation");
        this._confirmDeleteContainer.classList.add("hidden");
        this._savedAttractionsContainer.remove(itemToDelete);
      });
      // add no button listener
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

export default new AttractionsView();
