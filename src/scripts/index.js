import '../pages/index.css';

import {
  initialCards
} from "./data.js";

import {
  cardConfig,
  formValidationConfig
} from "./config.js";

import UserInfo from "./userInfo.js";
import Section from "./section.js";
import Card from "./card.js";
import PopupWithImage from "./popup/popupWithImage.js";
import PopupWithForm from './popup/popupWithForm';
import FormValidator from "./validation.js";


const popupWithImage = new PopupWithImage(".js-card-details");

const createCard = (data) =>{
  const cardElement = Card.createCardElement(data, cardConfig, ()=>{
    popupWithImage.prepareContent(data);
    popupWithImage.open();
  });
  return cardElement;
}

const cardsSection = new Section({items:initialCards, renderer: (data)=>{
  const cardElement = createCard(data);
  cardsSection.addItem(cardElement);
}},cardConfig.cardsContainerSelector);

const userInfo = new UserInfo();
const userFormPopup = new PopupWithForm(".js-user-info", ([name, job])=>{
  userInfo.setUserInfo({name,job})
});

const cardFormPopup = new PopupWithForm(".js-card", ([name, link])=>{
  const cardElement = createCard({name,link});
  cardsSection.insertItem(cardElement);
});

function initSubscriptions() {
  popupWithImage.setEventListeners();
  cardFormPopup.setEventListeners();
  userFormPopup.setEventListeners();

  document.querySelector(".profile__button-edit").addEventListener('click', () => {
    const userInfoData = userInfo.getUserInfo();
    userFormPopup.setFields(userInfoData);
    userFormPopup.open();
    userFormPopup.raiseFormEvent(formValidationConfig.formOpenEvent);
  });

  document.querySelector(".profile__button-add").addEventListener('click', () => {
    cardFormPopup.open();
    cardFormPopup.raiseFormEvent(formValidationConfig.formOpenEvent);
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, formValidationConfig);
    validator.enableValidation();
  });

}

enableValidation();
initSubscriptions();

cardsSection.renderItems();
