export default class Views {
  render(data) {
    this._data = data;
    const html = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
}