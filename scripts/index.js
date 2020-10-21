import Popup from "./popup.js";
import Card from "./card.js";
import {initialCards} from "./data.js";
import {cardConfig, popupConfig} from "./config.js";


//не нравится как тут сделано с событием клавиатуры.
//нужно попытаться найти способ перенести это в класс Popup, чтобы контекст вызова this был не у докумена а у Popup
const keyHandler = function(evt){
  if (evt.key === "Escape") {
    popup.closePopup();
  }
}

const onOpen = () => document.addEventListener('keyup',keyHandler);
const onClose = () => document.removeEventListener('keyup',keyHandler);

const popup = new Popup(popupConfig, onOpen, onClose);

const profileManager = {
  editButton: document.querySelector(".profile__button-edit"),
  addButton: document.querySelector(".profile__button-add"),
  profileName: document.querySelector(".profile__name"),
  profileJob: document.querySelector(".profile__job"),

  getName: function getName() {
    return this.profileName.textContent;
  },

  getJob: function getJob() {
    return this.profileJob.textContent;
  },

  manageData: function (data) {
    this.profileName.textContent = data.name;
    this.profileJob.textContent = data.job;
  }
}

const profileFormManager = {
  form: document.querySelector(".profile-form"),
  nameInput: document.querySelector(".profile-form__name"),
  jobInput: document.querySelector(".profile-form__job"),

  setFields: function setFields(name, job) {
    this.nameInput.value = name;
    this.jobInput.value = job;
  },

  getData: function getData() {
    return {
      name: this.nameInput.value,
      job: this.jobInput.value
    };
  }
}

const elementImageManager = {
  figure: document.querySelector(".figure"),
  figureImage: document.querySelector(".figure__image"),
  figureCaption: document.querySelector(".figure__caption"),

  manageData: function manageData(data) {
    this.figureImage.src = data.link;
    this.figureImage.alt = `Картинка '${data.name}'`;
    this.figureCaption.textContent = data.name;
  }
}

const elementsManager = {
  elementsContainer: document.querySelector(".elements"),
  elementTemplate: document.querySelector("#template-element"),

  addElement: function addElement(element) {
    this.elementsContainer.append(element);
  },

  insertElement: function insertElement(element) {
    this.elementsContainer.prepend(element);
  },
}

const elementFormManager = {
  form: document.querySelector(".element-form"),
  nameInput: document.querySelector(".element-form__name"),
  linkInput: document.querySelector(".element-form__link"),

  clear: function clear() {
    this.form.reset();
  },

  getData: function getData() {
    return {
      name: this.nameInput.value,
      link: this.linkInput.value
    };
  }
}



function initSubscriptions() {
  popup._onOpen

  const submitData = function submitData(evt, data, manager) {
    evt.preventDefault();
    manager.manageData(data);
    popup.closePopup();
  }

  profileFormManager.form.addEventListener('submit', (evt) => {
    submitData(evt, profileFormManager.getData(), profileManager)
  });

  elementFormManager.form.addEventListener('submit', (evt) => {
    submitData(evt, elementFormManager.getData(), elementsManager);
  });

  profileManager.editButton.addEventListener('click', () => {
    profileFormManager.setFields(profileManager.getName(), profileManager.getJob());
    popup.openPopup(profileFormManager.form);
  });

  profileManager.addButton.addEventListener('click', () => {
    elementFormManager.clear();
    popup.openPopup(elementFormManager.form);
  });
}

const openCardHandler = function(name, link){
  elementImageManager.manageData({name,link});
  popup.openPopup(elementImageManager.figure);
}

function loadElements() {
  initialCards.forEach(data => {
    const card = new Card(data,cardConfig, openCardHandler);
    const element = card.generateCard();
    elementsManager.addElement(element);
  });
}



initSubscriptions();
loadElements();
