const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupManager = {
  page: document.querySelector(".page"),
  popup: document.querySelector(".popup"),
  closeButton: document.querySelector(".popup__button-close"),
  popupContent: document.querySelector(".popup__content"),
  popupContainer: document.querySelector(".popup__container"),

  openPopup: function openPopup(content) {
    this.popupContent.innerHTML = "";
    this.popupContent.append(content);
    this.popup.classList.add("popup_opened");
    document.addEventListener('keyup', this.keyHandler);
  },

  closePopup: function closePopup() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener('keyup', this.keyHandler);
  },

  canClosePopup: function canClosePopup(target) {
    return target === this.popup || target === this.closeButton || target === this.popupContainer;
  },

  keyHandler: function keyHandler(evt) {
    if (evt.key === "Escape") {
      popupManager.closePopup();
    }
  },
}

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

  createFromTemplate: function createFromTemplate(data) {
    const element = this.elementTemplate.content.cloneNode(true);
    element.querySelector(".element__title").textContent = data.name;

    const elementImage = element.querySelector(".element__image");
    elementImage.src = data.link;
    elementImage.alt = `Картинка '${data.name}'`;

    element.querySelector(".element__delete").addEventListener('click', (evt) => {
      evt.target.parentNode.remove();
    });

    element.querySelector(".element__like").addEventListener('click', (evt) => {
      evt.target.classList.toggle("icon-button_type_like-active");
    });

    elementImage.addEventListener('click', () => {
      elementImageManager.manageData(data);

      popupManager.openPopup(elementImageManager.figure);
    })

    return element;
  },

  manageData: function manageData(data) {
    const element = this.createFromTemplate(data);
    this.insertElement(element);
  }
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
  const submitData = function submitData(evt, data, manager) {
    evt.preventDefault();
    manager.manageData(data);
    popupManager.closePopup();
  }

  profileFormManager.form.addEventListener('submit', (evt) => {
    submitData(evt, profileFormManager.getData(), profileManager)
  });

  elementFormManager.form.addEventListener('submit', (evt) => {
    submitData(evt, elementFormManager.getData(), elementsManager);
  });

  profileManager.editButton.addEventListener('click', () => {
    profileFormManager.setFields(profileManager.getName(), profileManager.getJob());
    popupManager.openPopup(profileFormManager.form);
  });

  popupManager.popup.addEventListener('click', (evt) => {
    if (popupManager.canClosePopup(evt.target)) {
      popupManager.closePopup();
    }
  });

  profileManager.addButton.addEventListener('click', () => {
    elementFormManager.clear();
    popupManager.openPopup(elementFormManager.form);
  });
}

function loadElements() {
  initialCards.forEach(x => {
    const element = elementsManager.createFromTemplate(x);
    elementsManager.addElement(element);
  });
}

initSubscriptions();
loadElements();
