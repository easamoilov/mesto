export default class UserInfo {
  constructor() {
    this._name = document.querySelector(".profile__name");
    this._about = document.querySelector(".profile__job");
    this._avatar = document.querySelector(".profile__avatar");
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }

  setAvatar(avatarUrl) {
    console.log(avatarUrl);
    this._avatar.src = avatarUrl;
    console.log(this._avatar);
  }

  getAvatar() {
    return this._avatar.src;
  }

  init(data) {
    this.setUserInfo(data);
    this.setAvatar(data.avatar);
    this.id = data.id;
  }
}
