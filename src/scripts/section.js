export default class Section {
  constructor ({items, renderer}, containerSelector){
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  }

  addItem(item){
    this._container.append(item);
  }

  insertItem(item){
    this._container.prepend(item);
  }

  clear(){
    this._container.innerHTML = '';
  }

  renderItems(){
    this.clear();
    this._items.forEach(data=>{
      this._renderer(data);
    });
  }
}
