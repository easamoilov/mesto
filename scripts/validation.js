const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(settings.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputErrorClass);

  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
}


const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, inputList, settings) => {
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    })
  });
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {

    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (hasInvalidInput(inputList)) {
        //использую данный метод для того, чтобы подписка submit в index.js не выполнялась.      
        evt.stopImmediatePropagation();
      }
    });

    setEventListeners(formElement, inputList, settings);
  })
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
})
