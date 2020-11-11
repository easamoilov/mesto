export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.append(item);
  }

  insertItem(item) {
    this._container.prepend(item);
  }

  clear() {
    this._container.innerHTML = '';
  }

  deleteById(idSelector) {
    const element = this._container.querySelector(idSelector);
    if (element) {
      element.remove();
    }
  }
}
