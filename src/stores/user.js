import { observable } from 'mobx';
import { hostname } from '../constant';

class Store {
    @observable userInfo = {}

    async loadUser() {
      let user;
      user = await fetch(hostname + '/user');
      user = await user.json();
      this.userInfo = user.data;
    }
}

const user = new Store(); 
export default user;