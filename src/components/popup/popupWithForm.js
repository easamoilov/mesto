import Popup from "./popup.js"

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._submitHandler = submitHandler.bind(this);
    this._getInputValuesBind = this._getInputValues.bind(this);
    this._submitButton = this._form.querySelector(".form__submit");
    this._submitButtonText = this._submitButton.textContent;
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValuesBind())
    });
  }

  _getInputValues() {
    const elements = Array.from(this._getInputElements());
    return elements.map(x => x.value);
  }

  _getInputElements() {
    return this._form.querySelectorAll(".form__input");
  }

  setFields(data) {
    const elements = Array.from(this._getInputElements());

    const dataValues = Object.values(data);

    elements.forEach((item, index, elements) => {
      if (dataValues[index]) {
        item.value = dataValues[index];
      }
    });
  }

  raiseFormEvent(eventName) {
    const event = new CustomEvent(eventName);
    this._form.dispatchEvent(event);
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
