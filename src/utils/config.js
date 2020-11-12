export const cardConfig = {
  templateSelector: "#template-element",
  cardSelector: ".element",
  titleSelector: ".element__title",
  imageSelector: ".element__image",
  deleteButtonSelector: ".element__delete",
  likeButtonSelector: ".element__like",
  cardsContainerSelector: ".elements",
  likeButtonModifier: "icon-button_type_like-active",
  likeCountSelector: ".element__likecount"
}

export const formValidationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  formOpenEvent: "open",
}

export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  token: "543c1d53-4f5f-4fd4-8bd1-0e9e6354f53b"
}
