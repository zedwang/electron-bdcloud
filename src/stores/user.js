import { observable, action } from 'mobx';

class User {
    @observable showOnTap = false;
    @observable startUp = false;


    @action setAlwayOnTop() {
        user.startUp = true;
    }
}

const user = new User() 

export default user