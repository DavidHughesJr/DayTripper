import mapboxgl from "mapbox-gl";
import { RESULTS_PER_PANEL } from "../../config";
import View from "../View";

class HotelsPaginationView extends View {
  _parentElement = document.getElementById("pagination-hotel");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-hotel--panel");
      if(!btn) return 
      
      const goToPageNum = +btn.dataset.pagenum;
      handler(goToPageNum);
    });
  }

  _generateMarkup() {
    let currentPage = this._data.page;
    let numPages = Math.ceil(this._data.hotels.length / RESULTS_PER_PANEL);
 
    // page 1 with more pages
    const map = document.getElementById("map");
    map.addEventListener("click", () => {
      let currentPage = 1
      numPages = Math.ceil(this._data.hotels.length / RESULTS_PER_PANEL);
    });

    if (currentPage === 1 && numPages > 1) {
      return `<div id="pagination-hotel" class="pagination flex">
                            <div class="page-number"> ${currentPage} of ${numPages} </div>
                            <button data-pagenum="${currentPage + 1}" class="btn-hotel--panel"> Next </button>
                        </div>`;
    }
    // middle pages
    if (currentPage < numPages) {
      return `<div id="pagination-hotel" class="pagination flex">
                            <button data-pagenum="${
                              currentPage - 1
                            }"class="btn-hotel--panel"> Previous </button>
                            <div class="page-number"> ${currentPage} of ${numPages} </div>
                            <button data-pagenum="${
                              currentPage + 1
                            }"class="btn-hotel--panel"> Next </button>
                        </div>`;
    }
    // last page
    if (currentPage === numPages && numPages > 1) {
      return `
        <div id="pagination-hotel" class="pagination flex">
                            <button data-pagenum="${currentPage - 1}"class="btn-hotel--panel "> Previous </button>
                            <div class="page-number"> ${currentPage} of ${numPages} </div>`
    }
    // only 1 page
    if(map.clicked) currentPage = 1
    return `<div id="pagination-hotel" class="pagination flex">
                            <div class="page-number"> ${currentPage} of ${numPages} </div>
                        </div>`;
  }
}

export default new HotelsPaginationView();
