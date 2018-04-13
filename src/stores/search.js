import { observable, action } from 'mobx';

class Search {
    @observable text;


    @action 
    search(q) {
      this.text = q;
      console.log(q);
    }
}

const search = new Search();

export default search;