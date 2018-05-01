import { observable ,toJS } from 'mobx';

class History {
  recorder = [{step: '/', breadcrumb: ['/']}];
  index = 0;
  @observable first = true;
  @observable last = true;

  add(store) {
    const raw = toJS(store);
    const new_recorder = this.recorder.slice(0, this.index + 1);
    new_recorder.push({step: raw.dir, breadcrumb: raw.breadcrumb});
    this.recorder = new_recorder;
    this.index = this.recorder.length - 1;
  }

  clear() {
    this.recorder = [{step: '/', breadcrumb: ['/']}];
  }

  next() {
    this.index++;
    if (this.index === this.recorder.length) this.index = this.recorder.length - 1;
    return this.recorder[this.index];
  }

  prev() {
    this.index-- ;
    if (this.index < 0) {
      this.index = 0;
      this.first = true;
    }
    return this.recorder[this.index];
  }

  getCurrent() {
    return this.recorder[this.index];
  }
}

const history = new History();

export default history;