export default class Card {
  constructor(data, cardConfig, openCardHandler) {
    this._name = data.name;
    this._link = data.link;
    this._cardConfig = cardConfig;
    this._openCardHandler = openCardHandler;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardConfig.templateSelector).content.cloneNode(true);
    return template;
  }

  _fillElements() {
    this._cardTemplate.querySelector(this._cardConfig.titleSelector).textContent = this._name;
    const image = this._cardTemplate.querySelector(this._cardConfig.imageSelector);
    image.src = this._link,
      image.alt = `Картинка '${this._name}'`;
  }

  _initSubscriptions() {
    this._cardTemplate.querySelector(this._cardConfig.deleteButtonSelector).addEventListener('click', (evt) => {
      evt.target.parentNode.remove();
    });

    this._cardTemplate.querySelector(this._cardConfig.likeButtonSelector).addEventListener('click', (evt) => {
      evt.target.classList.toggle("icon-button_type_like-active");
    });

    this._cardTemplate.querySelector(this._cardConfig.imageSelector).addEventListener('click', () => {
      this._openCardHandler(this._name, this._link);
    })
  }

  generateCard() {
    this._cardTemplate = this._getTemplate();
    this._fillElements();
    this._initSubscriptions();
    return this._cardTemplate;
  }
}
