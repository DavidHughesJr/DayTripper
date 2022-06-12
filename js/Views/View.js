import sunLoader from "url:../../imgs/sun.gif";

export default class Views {
  render(data) {
    this._data = data;
    const html = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  renderSunLoader() {
    const markup = `
      <div id="render-icons--center">
        <img src="${sunLoader}" alt="loading-sun-images">
     </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
}
