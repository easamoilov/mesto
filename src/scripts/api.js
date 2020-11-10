export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    // ...
  }

  getUserInfo(){
    return this._get(`${this._baseUrl}/users/me`)
    .then(this._readResponse);
  }

  getCards(){
    return this._get(`${this._baseUrl}/cards`)
    .then(this._readResponse);
  }

  _readResponse(response){
    if(response.ok){
      return response.json();
    }
    Promise.reject(`Error while sending request: ${response.status}`)
  }

  _get(url){
    return fetch(url,{
      method: 'GET',
      headers: this._headers
    })
  }
}
