export default class Popup{
  constructor(popupConfig, onOpen, onClose){
    this._popup = document.querySelector(popupConfig.popupSelector);
    this._closeButton = document.querySelector(popupConfig.buttonCloseSelector);
    this._popupContent = document.querySelector(popupConfig.contentSelector);
    this._popupContainer = document.querySelector(popupConfig.containerSelector);
    this._onOpen = onOpen;
    this._onClose = onClose;
    this._initSubscriptions();
  }

  openPopup(content){
    this._setContent(content);
    this._popup.classList.add("popup_opened");
    this._onOpen();
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    this._onClose();
  }

  _initSubscriptions(){
    this._popup.addEventListener('click',(evt) => {
      if (this._canClosePopup(evt.target)) {
        this.closePopup();
      }
    });

    this._closeButton.addEventListener('click', (evt)=>{
      this.closePopup()
    });
  }

  _testHendler(evt){
    console.log(this);
  }

  _setContent(content){
    this._popupContent.innerHTML = "";
    this._popupContent.append(content);
  }

  _canClosePopup(target) {
    return target === this._popup || target === this._popupContainer;
  }
}
