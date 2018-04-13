import { observable } from 'mobx';
import { remote, ipcRenderer } from 'electron';


class Window {
    window
    // normal max min 
    @observable isMax
    @observable showLandingPoint = false;
    constructor() {
      this.window = remote.getCurrentWindow();
      this.isMax = this.window.isMaximized();
    }

    exit() {
      this.window.close();
    }
 
    mini() {
      this.window.minimize();
    }

    max() {
      this.isMax = !this.isMax;
      this.window.maximize();
    }

    restore() {
      this.isMax = !this.isMax;
      this.window.restore();
    }

    hiddenWindow() {
      ipcRenderer.send('hidden-window', 'hello');
       
    }

    showLanding() {
      this.showLandingPoint = !this.showLandingPoint;
    }
}

const window = new Window();

export default window;

export {Window};