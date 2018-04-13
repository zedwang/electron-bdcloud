import { observable } from 'mobx';

class Store {
    @observable userInfo = {}

    async loadUser() {
      let user = await fetch('/user');
      user = await user.json();
      this.userInfo = user.data;
    }
}

const user = new Store(); 
export default user;