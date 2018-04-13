import { observable, action } from 'mobx';

class Login {
    @observable isLogin = false;


    @action login() {
      login.isLogin = true;
    }
}

const login = new Login();

export default login;