import {
  initialCards
} from "./data.js";

import {
  cardConfig,
  popupConfig,
  profileConfig,
  cardDetailsConfig,
  profileFormConfig,
  cardFormConfig,
  formValidationConfig
} from "./config.js";

import Popup from "./popup.js";
import CardDetails from "./card/cardDetails.js";
import Card from "./card/card.js";
import CardsContainer from "./card/cardsContainer.js";
import Profile from "./profile.js";
import ProfileForm from "./form/profileForm.js";
import CardForm from "./form/cardForm.js";
import FormValidator from "./validation.js";


const popup = new Popup(popupConfig);
const showPopup = (content) => popup.openPopup(content);
const hidePopup = () => popup.closePopup();

const cardDetails = new CardDetails(cardDetailsConfig, showPopup);
const cardsContainer = new CardsContainer(cardConfig.cardsContainerSelector);

const profile = new Profile(profileConfig);
const profileForm = new ProfileForm(profileFormConfig, profile, showPopup, hidePopup);

const cardFormManager = {
  manageData: function manageData(data) {
    const cardElement = Card.createCardElement(data, cardConfig, cardDetails);
    cardsContainer.insert(cardElement);
  }
}
const cardForm = new CardForm(cardFormConfig, cardFormManager, showPopup, hidePopup);



function enableValidation() {
  const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, formValidationConfig);
    validator.enableValidation();
  });

}

function initSubscriptions() {

  document.querySelector(".profile__button-edit").addEventListener('click', () => {
    profileForm.openForm();
  });

  document.querySelector(".profile__button-add").addEventListener('click', () => {
    cardForm.openForm();
  });
}

function loadElements() {
  initialCards.forEach(data => {
    const cardElement = Card.createCardElement(data, cardConfig, cardDetails);
    cardsContainer.add(cardElement);
  });
}


enableValidation();
initSubscriptions();
loadElements();
