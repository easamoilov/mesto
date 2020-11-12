import './index.css';

import {
  cardConfig,
  formValidationConfig,
  apiConfig
} from "../utils/config.js";

import UserInfo from "../components/userInfo.js";
import Section from "../components/section.js";
import Card from "../components/card.js";
import PopupWithImage from "../components/popup/popupWithImage.js";
import PopupWithForm from "../components/popup/popupWithForm.js";
import FormValidator from "../components/validation.js";
import Api from "../components/api.js";

const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: {
    authorization: apiConfig.token,
    'Content-Type': 'application/json'
  }
});

const cardsSection = new Section(cardConfig.cardsContainerSelector);

const userInfo = new UserInfo();

const popupWithImage = new PopupWithImage(".js-card-details");

const userFormPopup = new PopupWithForm(".js-user-info", ([name, about]) => {
  userFormPopup.renderLoading(true);
  api.updateUserInfo({ name, about })
    .then(data => userInfo.setUserInfo(data))
    .then(() => userFormPopup.close())
    .catch(err => console.log(err))
    .finally(() => userFormPopup.renderLoading(false));
});

const cardFormPopup = new PopupWithForm(".js-card", ([name, link]) => {
  cardFormPopup.renderLoading(true);
  api.addCard({ name, link })
    .then(data => {
      const cardElement = createCard(data);
      cardsSection.insertItem(cardElement);
    })
    .then(cardFormPopup.close())
    .catch(err => console.log(err))
    .finally(() => {
      cardFormPopup.renderLoading(false);
    });
});

const deleteCardPopup = new PopupWithForm(".js-delete-card", () => {
  const cardId = deleteCardPopup.cardId;
  api.deleteCard(cardId)
    .then(() => cardsSection.deleteById(Card.getIdSelector(cardId)))
    .then(() => deleteCardPopup.close())
    .catch(err => console.log(err));
});

const editAvatarForm = new PopupWithForm(".js-avatar", ([avatarLink]) => {
  editAvatarForm.renderLoading(true);
  api.updateAvatar(avatarLink)
    .then(() => userInfo.setAvatar(avatarLink))
    .then(() => editAvatarForm.close())
    .catch(err => console.log(err))
    .finally(() => {
      editAvatarForm.renderLoading(true);
    });
});

const createCard = (data) => {
  const cardClick = () => {
    popupWithImage.prepareContent(data);
    popupWithImage.open();
  };

  const cardLike = (cardId, isLiked) => {
    return api.like(cardId, !isLiked);
  };

  const cardDelete = (cardId) => {
    deleteCardPopup.cardId = cardId;
    deleteCardPopup.open();
  };

  const userId = userInfo.id;

  const card = new Card({ data, userId }, cardConfig);
  card.setEventListeners(cardClick, cardLike, cardDelete);

  return card.generateCard();
}

function initSubscriptions() {
  popupWithImage.setEventListeners();
  cardFormPopup.setEventListeners();
  userFormPopup.setEventListeners();
  deleteCardPopup.setEventListeners();
  deleteCardPopup.renderOnLoading = false;
  editAvatarForm.setEventListeners();

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

  document.querySelector(".icon-button_type_avatar").addEventListener('click', () => {
    const avatarLink = userInfo.getAvatar();
    editAvatarForm.setFields({ avatarLink });
    editAvatarForm.open();
    editAvatarForm.raiseFormEvent(formValidationConfig.formOpenEvent);
  })
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, formValidationConfig);
    validator.enableValidation();
  });

}

function loadUserInfo() {
  return api.getUserInfo()
    .then(data => {
      userInfo.init({
        id: data._id,
        name: data.name,
        about: data.about,
        avatar: data.avatar
      });
    });
}

function loadCards() {
  return api.getInitialCards()
    .then(data => {
      data.forEach(x => {
        const cardElement = createCard(x);
        cardsSection.addItem(cardElement);
      })
    });
}

loadUserInfo()
  .then(() => loadCards())
  .catch(err => console.log(err))

enableValidation();
initSubscriptions();
