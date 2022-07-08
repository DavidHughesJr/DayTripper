import { RESULTS_PER_PANEL } from "../../config";
import View from "../View";

class RestaurantsPaginationView extends View {
  _parentElement = document.getElementById("pagination-restaurant");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closet(".btn-rest--panel");
      if (!btn) return;
      const goToPage = +btn.dataset.goToPage;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const map = document.getElementById("map");
    map.addEventListener("click", () => {
      let currentPage = 1;
      numPages = Math.ceil(this._data.hotels.length / RESULTS_PER_PANEL);
    });
    const pageNum = Math.ceil(
      this._data.restaurants.length / RESULTS_PER_PANEL
    );

    let currentPage = this._data.page;

    // page 1 with more pages
    if (currentPage === 1 && pageNum > 1) {
      return `<div id="pagination-restaurant" class="pagination flex">
                            <div class="page-number"> ${currentPage} of ${pageNum} </div>
                            <button data-pagenum="${
                              currentPage + 1
                            } class="btn-rest--panel"> Next </button>
                        </div>`;
    }
    // middle pages
    if (currentPage < pageNum) {
      return `<div id="pagination-restaurant" class="pagination flex">
                            <button data-pagenum="${
                              currentPage - 1
                            }class="btn-rest--panel "> Previous </button>
                            <div class="page-number"> ${currentPage} of ${pageNum} </div>
                            <button data-pagenum="${
                              currentPage + 1
                            }class="btn-rest--panel"> Next </button>
                        </div>`;
    }
    // last page
    if (currentPage === pageNum && pageNum > 1) {
      return `
        <div id="pagination-restaurant" class="pagination flex">
                            <button class="btn-rest--panel "> Previous </button>
                            <div class="page-number"> ${currentPage} of ${pageNum} </div>
                            <button data-pagenum="${
                              currentPage + 1
                            }class="btn-rest--panel"> Next </button>
                        </div>`;
    }
    // only 1 page
    if(map.clicked) currentPage = 1
    return `<div id="pagination-restaurant" class="pagination flex">
                            <div class="page-number"> ${currentPage} of ${pageNum} </div>
                        </div>`;
  }
}

export default new RestaurantsPaginationView();
