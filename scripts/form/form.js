export default class Form {
  constructor(config, formManager, showHandler, hideHandler) {
    this._form = document.querySelector(config.formSelector);
    this._showHanlder = showHandler;
    this._formManager = formManager;
    this._showHanlder = showHandler;
    this._hideHandler = hideHandler;
    this._initSubscription();
  }

  _initSubscription() {
    this._form.addEventListener('submit', (evt) => {
      this._submit(evt);
    });
  }

  _submit(evt) {
    console.log("submit form")
    evt.preventDefault();
    const data = this._getData();
    this._formManager.manageData(data);
    this._hideHandler();
  }

  openForm() {
    this._fillForm();
    this._showHanlder(this._form);
  }
}
