import View from "../View";

class Saves extends View {
  _parentElement = document.getElementById("saved");

  deleteSaves() {
    console.log(this._parentElement);
    this._parentElement.addEventListener("dblclick", (e) => {
      const savedItem = e.target.closest(".panel-cards");
      this._parentElement.removeChild(savedItem);
    });
  }
  addHandlerDeleteSaves(handler) {
    handler();
  }
}

export default new Saves();
