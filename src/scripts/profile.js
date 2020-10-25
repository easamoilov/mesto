export default class Profile {
  constructor(config) {
    this._name = document.querySelector(config.nameSelector);
    this._job = document.querySelector(config.jobSelector);
  }

  getName() {
    return this._name.textContent;
  }

  getJob() {
    return this._job.textContent;
  }

  manageData(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}
