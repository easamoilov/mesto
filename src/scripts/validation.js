export default class FormsValidator {
  constructor(formElement, config) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {

    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (this._hasInvalidInput()) {
        evt.stopImmediatePropagation();
      }
    });

    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _setEventListeners() {
    this._toggleButtonState();

    this._formElement.addEventListener(this._config.formOpenEvent, (evt) => {
      this._toggleButtonState();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);

    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }


  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
}
