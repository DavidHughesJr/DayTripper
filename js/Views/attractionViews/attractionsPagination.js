import { RESULTS_PER_PANEL } from "../../config";
import View from "../View";

class PaginationAttractionView extends View {
  _parentElement = document.getElementById("pagination-attraction");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-att--panel");
      if (!btn) return;
      const goToPageNum = +btn.dataset.pagenum;
      handler(goToPageNum);
    });
  }

  _generateMarkup() {
    const map = document.getElementById("map");
    map.addEventListener("click", () => {
      let currentPage = 1;
      numPages = Math.ceil(this._data.hotels.length / RESULTS_PER_PANEL);
    });
    const numPages = Math.ceil(
      this._data.attractions.length / RESULTS_PER_PANEL
    );
    let currentPage = this._data.page;

    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `<div id="pagination-attraction" class="pagination flex">
                           <div class="page-number"> ${currentPage} of ${numPages} </div>
                            <button data-pagenum="${
                              currentPage + 1
                            }" class="btn-att--panel"> Next </button>
                        </div>`;
    }
    // last page
    if (currentPage === numPages && numPages > 1) {
      return `<div id="pagination-attraction" class="pagination flex">
                            <button data-pagenum="${
                              currentPage - 1
                            }"class="btn-att--panel"> Previous </button>
                            <div class="page-number"> ${currentPage} of ${numPages} </div>
                        </div>`;
    }
    // other page
    if (currentPage < numPages) {
      return `<div id="pagination-attraction" class="pagination flex">
                            <button data-pagenum="${
                              currentPage - 1
                            }"class="btn-att--panel"> Previous </button>
                           <div class="page-number"> ${currentPage} of ${numPages} </div>
                            <button data-pagenum="${
                              currentPage + 1
                            }"class="btn-att--panel"> Next </button>
                        </div>`;
    }
    // only 1 page
    if (map.clicked) currentPage = 1;
    return `<div id="pagination-attraction" class="pagination flex">
                            <div class="page-number"> ${currentPage} of ${numPages} </div>
                        </div>`;
  }
}

export default new PaginationAttractionView();
