import { observable, action } from 'mobx';

class Files {
    
    @observable data;
    @observable category = 0;
    @observable path;



    @action
    /**
     * type 
     * {4:文档,1:视频,7:种子,2:音乐,6:其他,3:图片}
     */
    async fetchFiles(type) {
        window.fetch && fetch('')
        // await { data } = axios.get('');
    }   

    @action
    setData(data) {
        this.data = data;
    }

    @action
    setCategory(type){
        this.category = type;
    }

}

export default new Files()