export default class CardDetails {
  constructor(config, showPopupHandler) {
    this._figure = document.querySelector(config.figureSelector);
    this._image = document.querySelector(config.imageSelector);
    this._caption = document.querySelector(config.captionSelector);
    this._showPopupHandler = showPopupHandler;
  }

  _manageData(data) {
    this._image.src = data.link;
    this._image.alt = `Картинка '${data.name}'`;
    this._caption.textContent = data.name;
  }

  open(data) {
    this._manageData(data);
    this._showPopupHandler(this._figure);
  }
}
