export default class Popup {
  constructor(popupConfig) {
    this._popup = document.querySelector(popupConfig.popupSelector);
    this._closeButton = document.querySelector(popupConfig.buttonCloseSelector);
    this._popupContent = document.querySelector(popupConfig.contentSelector);
    this._popupContainer = document.querySelector(popupConfig.containerSelector);
    this._keyHandlerBind = this._keyHandler.bind(this);
    this._initSubscriptions();
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._onOpen();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._onClose();
  }

  initSubscriptions() {
    this._popup.addEventListener('click', (evt) => {
      if (this._canClosePopup(evt.target)) {
        this.closePopup();
      }
    });

    this._closeButton.addEventListener('click', (evt) => {
      this.closePopup()
    });
  }

  _setContent(content) {
    this._popupContent.innerHTML = "";
    this._popupContent.append(content);
  }

  _canClosePopup(target) {
    return target === this._popup || target === this._popupContainer;
  }

  _keyHandler(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  _onOpen() {
    document.addEventListener('keyup', this._keyHandlerBind);
  }

  _onClose() {
    document.removeEventListener('keyup', this._keyHandlerBind);
  }
}
