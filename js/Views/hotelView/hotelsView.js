import { LOAD_CURRENT_PANEL } from "../../config";
import View from "../View";
import { NO_SAVED_HOTELS } from "../../config";

class HotelsView extends View {
  _childElement = document.getElementById("hotels");
  _confirmSaveContainer = document.getElementById("confirm-save");
  _confirmDeleteContainer = document.getElementById("confirm-delete");
  _savedHotelsContainer = document.getElementById("saved-hotels");
  _overlay = document.getElementById("confirmation-overlay");
  _yesSaveBtn = document.getElementById("yes-save--btn");
  _noSaveBtn = document.getElementById("no-save--btn");
  _yesDeleteBtn = document.getElementById("yes-delete--btn");
  _noDeleteBtn = document.getElementById("no-delete--btn");
  _allButtons = document.getElementsByName("button");
  _key = "hotels";
  _savedHotels = localStorage.getItem(this._key);

  _renderHotels(data) {
    this._data = data;
    this._clearChild();
    const loadData = () => {
      const renderHotels = this._data
        .map((data) => {
          const hotelsCard = this._generateMarkup(data);
          return hotelsCard;
        })
        .join("");
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
                            } </span> <span> Rating: ${data.rating.replace(
      ".0",
      ""
    )}/5 Stars </span> </div>
                        </div>
                        <div> <span> ${data.ranking} </span></div>
                        <div class="panel-info--2 flex">
                            <div class="panel-info--2 flex">
                            <div class="trip-link"> <span> <a href="${data.tripAdvisorUrl}"> More Info 🌐 </a> </span> </div>
                            <div> <button class="save-button">  Save ❤  </button> </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
  }
  addToSavedHotels() {
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
        if(this._savedHotelsContainer.innerHTML = NO_SAVED_HOTELS){
          this._savedHotelsContainer.innerHTML = ''
        }
        this._savedHotelsContainer.appendChild(newSaves);

        // define key and value to check in local storage
        localStorage.setItem(
          this._key,
          this._savedHotelsContainer.innerHTML
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
    if (this._savedHotels) {
      this._savedHotelsContainer.insertAdjacentHTML(
        "afterbegin",
        this._savedHotels
      );
    } else if(this._savedHotelsContainer.innerHTML = " ") {
      this._savedHotelsContainer.innerHTML = NO_SAVED_HOTELS
    }
  }
  deleteSaves() {
    this._savedHotelsContainer.addEventListener("dblclick", (e) => {
      const itemToDelete = e.target.closest(".panel-cards");
      this._confirmDeleteContainer.classList.remove("hidden");
      this._overlay.classList.add("wait-confirmation");
      // add delete button listener
      this._yesDeleteBtn.addEventListener("click", () => {
        // delete to item that was dblclicked
        this._savedHotelsContainer.removeChild(itemToDelete);
        // update local storage to new HTML , use same key to override //
        localStorage.setItem(
          this._key,
          this._savedHotelsContainer.innerHTML
        );
        this._overlay.classList.remove("wait-confirmation");
        this._confirmDeleteContainer.classList.add("hidden");
        this._savedHotelsContainer.remove(itemToDelete);
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

export default new HotelsView();
