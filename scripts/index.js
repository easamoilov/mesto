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

  openPopup: function openPopup() {
    if (!this.popup.classList.contains("popup_opened")) {
      this.popup.classList.add("popup_opened");
    }
  },

  closePopup: function closePopup() {
    this.popup.classList.remove("popup_opened");
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

  save: function (name, job) {
    this.profileName.textContent = name;
    this.profileJob.textContent = job;
  }
}

const profileFormManager = {
  form: document.querySelector(".edit-form"),
  nameInput: document.querySelector(".edit-form__input_type_name"),
  jobInput: document.querySelector(".edit-form__input_type_job"),

  setFields: function setFields(name, job) {
    this.nameInput.value = name;
    this.jobInput.value = job;
  },

  getName: function getName() {
    return this.nameInput.value;
  },

  getJob: function getName() {
    return this.jobInput.value
  }
}

const elementsManager = {
  elementsContainer: document.querySelector(".elements"),
  elementTemplate: document.querySelector("#template-element"),

  addElement: function addElement(element) {
    this.elementsContainer.append(element);
  },

  createFromTemplate: function createFromTemplate(data) {
    const element = this.elementTemplate.content.cloneNode(true);
    element.querySelector(".element__title").textContent = data.name;

    const elementImage = element.querySelector(".element__image");
    elementImage.src = data.link;
    elementImage.alt = `Картинка '${data.name}'`;

    const deleteButton = element.querySelector(".element__delete");

    element.querySelector(".element__delete").addEventListener('click', (evt) => {
      evt.target.parentNode.remove();
    });

    element.querySelector(".element__like").addEventListener('click', (evt) => {
      evt.target.classList.toggle("icon-button_type_like-active");
    });

    return element;
  }
}

function initSubscriptions() {
  profileManager.editButton.addEventListener('click', () => {
    profileFormManager.setFields(profileManager.getName(), profileManager.getJob());
    popupManager.openPopup();
  });

  popupManager.closeButton.addEventListener('click', () => {
    popupManager.closePopup();
  });

  profileFormManager.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileManager.save(profileFormManager.getName(), profileFormManager.getJob());
    popupManager.closePopup();
  });
}


function loadElements() {
  initialCards.forEach(x => {
    let element = elementsManager.createFromTemplate(x);
    elementsManager.addElement(element);
  });
}

initSubscriptions();
loadElements();
