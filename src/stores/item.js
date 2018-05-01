import { observable } from 'mobx';

export default class FileModel {
    store;
    id;
    size;
    type;
    lastModified;
    isEdit;
    @observable name;
    @observable selected;
    
    constructor(store, id, name, size, type, lastModified, selected) {
      this.store = store;
      this.id = id;
      this.name = name;
      this.size = size;
      this.type = type;
      this.lastModified = lastModified;
      this.selected = selected;
    }

    setName(title) {
      this.name = title;
    }

    setSelected(selected) {
      this.selected = selected;
    }

    destroy() {
      this.store.files.remove(this);
    }

    toJs() {
      return {
        id: this.id,
        size: this.size,
        type: this.type,
        name: this.name,
        lastModified: this.lastModified
      };
    }

    static fromJS(store, object) {
      return new FileModel(store, object.id, object.name, object.size, object.type, object.lastModified, object.selected);
    }
}