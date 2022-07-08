import View from "../View";

class PageView extends View {
  _header = document.querySelector(".header");
  _stickyNavObserver = document.querySelector(".sticky-nav--observer");
  _hamburgerIcon = document.getElementById("hamburger-icon");
  _hamburgerContainer = document.querySelector(".hamburger-container");

  toggleMobileMenu() {
    this._hamburgerIcon.addEventListener("click", () => {
      this._hamburgerContainer.classList.toggle("hidden");
    });
  }
  enableStickyNav() {
    const stickyNav = (entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        this._header.classList.add("sticky");
      } else this._header.classList.remove("sticky");
    };
    const options = {
      root: null,
      threshold: 0,
      rootMargin: "50px",
    };
    const headerObserver = new IntersectionObserver(stickyNav, options);

    headerObserver.observe(this._stickyNavObserver);
  }
  addHandlerEnable(handler) {
    handler();
  }
}

export default new PageView();
