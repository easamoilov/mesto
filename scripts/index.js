const pageObjects = {
  page: document.querySelector(".page"),
  popup: document.querySelector(".popup"),
  editButton: document.querySelector(".profile__button-edit"),
  addButton: document.querySelector(".profile__button-add"),
  closePopupButton: document.querySelector(".popup__button-close"),
  profileTitle: document.querySelector(".profile__title"),
  profileDescription: document.querySelector(".profile__description"),
  test: 'test',

  openPopup: function openPopup() {
    this.popup.classList.remove("popup_closed");
    if (!this.page.classList.contains("page_overflow-hidden")) {
      !this.page.classList.add("page_overflow-hidden");
    }
  },

  closePopup: function closePopup() {
    if (!this.popup.classList.contains("popup_closed")) {
      this.popup.classList.add("popup_closed");
    }
    this.page.classList.remove("page_overflow-hidden");
  },


};

const editFormObjects = {
  nameText: document.querySelector(".edit-form__text_type_name"),
  descriptionText: document.querySelector(".edit-form__text_type_description"),
  saveButton: document.querySelector(".edit-form__button-save"),

  loadFromPage: function loadFromPage() {
    this.nameText.value = pageObjects.profileTitle.textContent;
    this.descriptionText.value = pageObjects.profileDescription.textContent;
  }
}

function edit() {
  editFormObjects.loadFromPage();
  pageObjects.openPopup();
}

pageObjects.editButton.addEventListener('click', edit);
pageObjects.closePopupButton.addEventListener('click', () => {
  pageObjects.closePopup()
});

console.log(pageObjects.page);
