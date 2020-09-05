const popupManager = {
  page: document.querySelector(".page"),
  popup: document.querySelector(".popup"),
  closeButton: document.querySelector(".popup__button-close"),

  openPopup: function openPopup() {
    if (!this.popup.classList.contains("popup_opened")) {
      !this.popup.classList.add("popup_opened");
    }
    if (!this.page.classList.contains("page_overflow-hidden")) {
      !this.page.classList.add("page_overflow-hidden");
    }
  },

  closePopup: function closePopup() {
    this.popup.classList.remove("popup_opened");
    this.page.classList.remove("page_overflow-hidden");
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

initSubscriptions();
