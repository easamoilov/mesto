import Form from "./form.js";

export default class ProfileForm extends Form {
  constructor(config, formManager, showHandler, hideHandler) {
    super(config, formManager, showHandler, hideHandler);
    this._nameInput = document.querySelector(config.nameSelector);
    this._jobInput = document.querySelector(config.jobSelector);
  }

  _fillForm() {
    this._nameInput.value = this._formManager.getName();
    this._jobInput.value = this._formManager.getJob();
  }

  _getData() {
    return {
      name: this._nameInput.value,
      job: this._jobInput.value
    };
  }
}
