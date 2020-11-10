export default class UserInfo {
  constructor() {
    this._name = document.querySelector(".profile__name");
    this._job = document.querySelector(".profile__job");
    this._avatar = document.querySelector(".profile__avatar");
  }

  getUserInfo(){
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }

  setAvatar(avatarUrl){
    this._avatar.setAttribute("style", `background-image:url("${avatarUrl}")`)
  }
}
