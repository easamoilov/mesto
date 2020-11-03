import Popup from "./popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._figure = this._popup.querySelector(".figure");
    this._image = this._popup.querySelector(".figure__image");
    this._caption = this._popup.querySelector(".figure__caption");
  }

  open(){
    super.open();
  }

  prepareContent({name, link}) {
    this._image.src = link;
    this._image.alt = `Картинка '${name}'`;
    this._caption.textContent = name;
  }
}
