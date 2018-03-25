import { observable, action, computed } from 'mobx';
import { remote, ipcRenderer } from 'electron';


class Window {
    window
    tray = null
    // normal max min 
    @observable isMax
    
    constructor() {
        this.window = remote.getCurrentWindow();
        this.isMax = this.window.isMaximized();
    }

    exit() {
        this.window.close();
    }
 
    mini() {
        this.window.minimize()
    }

    max() {
        this.isMax = !this.isMax;
        this.window.maximize()
    }

    restore() {
        this.isMax = !this.isMax;
        this.window.restore()
    }

  

    hiddenWindow() {
        ipcRenderer.send('hidden-window', 'hello')
       
    }

}

const window = new Window()

export default window

export {Window}