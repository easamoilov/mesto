export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__button-close");
    this._popupContent = this._popup.querySelector(".popup__content");
    this._popupContainer = this._popup.querySelector(".popup__container");
    this._keyHandlerBind = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._onOpen();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._onClose();
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (this._canClosePopup(evt.target)) {
        this.close();
      }
    });

    this._closeButton.addEventListener('click', (evt) => {
      this.close();
    });
  }

  _canClosePopup(target) {
    return target === this._popup || target === this._popupContainer;
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _onOpen() {
    document.addEventListener('keyup', this._keyHandlerBind);
  }

  _onClose() {
    document.removeEventListener('keyup', this._keyHandlerBind);
  }
}
