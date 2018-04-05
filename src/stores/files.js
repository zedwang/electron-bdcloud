import { observable, action } from 'mobx';

class Files {
    
    @observable data = [];
    @observable category = 0;
    @observable path = '/';



    /**
     * type 
     * {4:文档,1:视频,7:种子,2:音乐,6:其他,3:图片}
     */
    // fetch 默认的模式是不带cookie等数据到服务器上去的
    async fetchFiles(params = {}) {
        let files = await fetch('/search', {
            qs: params,
            cache: 'reload'
        })
        let { data } = await files.json(); 
        this.data = data;
    }   

    setCategory(type){
        this.category = type;
    }

    async upload(file, params) {
        const res = await fetch('/upload', {
            qs: params,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(file)
        })

        if (res) {
            this.fetchFiles(params)
        }
    }

}

export default new Files()