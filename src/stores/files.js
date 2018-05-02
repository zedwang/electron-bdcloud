import { observable, computed } from 'mobx';
import { hostname } from '../constant';

class Files {
    @observable breadcrumb = ['/']
    @observable data = [];
    @observable total = 0;
    @observable category = 0;
    @observable dir = '/';
    @observable selected = new Map();

    async createFolder(name) {
      return await fetch(`${hostname}/folder`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, dir: this.dir})
      });
    }
    /**
     * type 
     * {4:文档,1:视频,7:种子,2:音乐,6:其他,3:图片}
     */
    // fetch 默认的模式是不带cookie等数据到服务器上去的
    async fetchFiles(params) {
      const url = `${hostname}/files${params && params.length ? '?' + params : ''}`;
      const files = await fetch(url, {
        cache: 'default'
      });
      const { data, total } = await files.json(); 
      this.data = data;
      this.total = total;
      this.selected.clear();
    }   

    async upload(file, params) {
      await fetch(`${hostname}/files/upload${ params ? '?' + params : ''}`, {
        qs: params,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(file)
      });
      this.selected.clear();
    }

    rename(id, newName) {
      return fetch(`${hostname}/files/rename/${id}?name=${newName}`);
    }

    async moving(src, target) {
      await fetch(`${hostname}/files/moving`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({src, target})
      });
    }

    multiRemove(ids) {
      return fetch(`${hostname}/files/delete`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids)
      });
    }

    remove(id) {
      return fetch(`${hostname}/files/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }

    setCategory(type) {
      this.category = type;
    }

    setDir(dir) {
      this.dir = dir;
    }

    setBreadcrumb(data) {
      this.breadcrumb = data;
    }

    addBreadcrumb(step) {
      this.breadcrumb.push(step);
    }

    @computed
    get selectedSize() {
      return this.selected.size;
    }

}

export default new Files();