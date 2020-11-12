export default class Card {
  constructor({ data, userId }, cardConfig) {
    this._name = data.name;
    this._link = data.link;
    this._cardConfig = cardConfig;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this.id = data._id;
  }

  generateCard() {
    this._cardTemplate = this._getTemplate();
    this._fillElements();
    this._initSubscriptions();
    return this._cardTemplate;
  }

  setEventListeners(handleCardClick, handleCardLike, handleCardDelete) {
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._hanCardDelete = handleCardDelete;
  }

  _refreshLikes(element, likes) {
    const likeCountElement = element.querySelector(this._cardConfig.likeCountSelector);
    const likesCount = likes.length;
    likeCountElement.textContent = likesCount > 0 ? likesCount : '';
    if (likesCount > 0 && likes.some(x => x._id === this._userId)) {
      element.querySelector(this._cardConfig.likeButtonSelector).classList.add(this._cardConfig.likeButtonModifier);
      this.isLike = true;
    }
    else {
      element.querySelector(this._cardConfig.likeButtonSelector).classList.remove(this._cardConfig.likeButtonModifier);
      this.isLike = false;
    }
  }

  _getTemplate() {
    const template = document.querySelector(this._cardConfig.templateSelector).content.cloneNode(true);
    return template;
  }

  _fillElements() {
    this._cardTemplate.querySelector(this._cardConfig.cardSelector).id = Card.getId(this.id);
    this._cardTemplate.querySelector(this._cardConfig.titleSelector).textContent = this._name;
    const image = this._cardTemplate.querySelector(this._cardConfig.imageSelector);
    image.src = this._link;
    image.alt = `Картинка '${this._name}'`;
    if (!this._isMyCard()) {
      this._cardTemplate.querySelector(this._cardConfig.deleteButtonSelector).remove();
    }
    this._refreshLikes(this._cardTemplate, this._likes);
  }

  _initSubscriptions() {
    if (this._isMyCard()) {
      this._cardTemplate.querySelector(this._cardConfig.deleteButtonSelector).addEventListener('click', (evt) => {
        this._hanCardDelete(this.id);
      });
    }

    this._cardTemplate.querySelector(this._cardConfig.likeButtonSelector).addEventListener('click', (evt) => {
      this._handleCardLike(this.id, this.isLike)
        .then(data => {
          const cardElement = document.querySelector(Card.getIdSelector(data._id));
          this._refreshLikes(cardElement, data.likes);
        })
        .catch(err => console.log(err));
    });

    this._cardTemplate.querySelector(this._cardConfig.imageSelector).addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  _isMyCard() {
    return this._userId === this._ownerId;
  }

  static createCardElement(data, userId, cardConfig, handleCardClick, handleCardLike, handleCardDelete) {
    const card = new Card({ data, userId }, cardConfig);
    card.setEventListeners(handleCardClick, handleCardLike, handleCardDelete);
    return card.generateCard();
  }

  static getIdSelector(cardId) {
    return `#c${cardId}`;
  }

  static getId(cardId) {
    return `c${cardId}`;
  }
}
