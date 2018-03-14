import { observable, action, computed, autorun, extendObservable } from 'mobx';

class Store {
    @observable oo = {
      name: 1
    }
  };

const user = new Store() 
var i = 1;
// setInterval(() => {
//     console.log(user)
//     user.oo.name = i++;
// }, 2000);

// autorun(() => {
//   console.log(user.oo.name);
// });
export default user