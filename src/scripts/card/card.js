export default class Card {
  constructor(data, cardConfig, cardDetails) {
    this._name = data.name;
    this._link = data.link;
    this._cardConfig = cardConfig;
    this._cardDetails = cardDetails;
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
      this._cardTemplate = null;
      this._cardDetails = null;
      evt.target.parentNode.remove();
    });

    this._cardTemplate.querySelector(this._cardConfig.likeButtonSelector).addEventListener('click', (evt) => {
      evt.target.classList.toggle(this._cardConfig.likeButtonModifier);
    });

    this._cardTemplate.querySelector(this._cardConfig.imageSelector).addEventListener('click', () => {
      this._cardDetails.open({
        name: this._name,
        link: this._link
      });
      //this._openCardHandler(this._name, this._link);
    })
  }

  generateCard() {
    this._cardTemplate = this._getTemplate();
    this._fillElements();
    this._initSubscriptions();
    return this._cardTemplate;
  }

  static createCardElement(data, cardConfig, cardDetails) {
    const card = new Card(data, cardConfig, cardDetails);
    return card.generateCard();
  }
}
