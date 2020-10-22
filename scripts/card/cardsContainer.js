export default class CardsContainer {
  constructor(containerSelector) {
    this._containerSelector = containerSelector;
    this._getContainer();
  }

  _getContainer() {
    this._container = document.querySelector(this._containerSelector);
  }

  add(cardElement) {
    this._container.append(cardElement);
  }

  insert(cardElement) {
    this._container.prepend(cardElement);
  }
}
