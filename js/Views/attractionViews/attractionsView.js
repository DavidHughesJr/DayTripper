import View from "../View";
import { LOAD_CURRENT_PANEL } from "../../config";

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
          const attractionsCard = this._generateMarkup(data);
          return attractionsCard;
        })
        .join("");
      this._childElement.insertAdjacentHTML("afterbegin", renderAttractions);
    };
    setTimeout(loadData, LOAD_CURRENT_PANEL);
  }
  addToSavesContainer() {
    this._childElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".save-button");
      const savesContainer = document.getElementById('saved')
      const saves = e.target.closest(".panel-cards");
      const savesContent = document.getElementById('saved')
      const savesBtn = document.querySelectorAll('.save-button')
      savesContainer.appendChild(saves.cloneNode(true))

    

      if (!btn) return;
    });
  }
  addToSavedState(){
      this._childElement.addEventListener("click", (e) => {
        const btn = e.target.closest(".save-button");
        const savesContainer = document.getElementById("saved");
        const saves = e.target.closest(".panel-cards");
        if (!btn) return;
        return 
      });
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
                            <div> <span> <a href="${
                              data.tripAdvisorUrl
                            }"> More Info 🌐 </a> </span> </div>
                            <div> <button class="save-button">  Save ❤  </button> </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
  }
}

export default new AttractionsView();
