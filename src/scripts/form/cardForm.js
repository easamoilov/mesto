import Form from "./form.js";

export default class CardForm extends Form {
  constructor(config, formManager, showHandler, hideHandler) {
    super(config, formManager, showHandler, hideHandler);
    this._nameInput = document.querySelector(config.nameSelector);
    this._linkInput = document.querySelector(config.linkSelector);
  }

  _fillForm() {
    this._form.reset();
  }

  _getData() {
    return {
      name: this._nameInput.value,
      link: this._linkInput.value
    };
  }
}
