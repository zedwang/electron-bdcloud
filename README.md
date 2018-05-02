# 仿百度云盘客户端

基于`Electron`,`Webpack3`,`Babel7`,`React16`,`MobX`
![shortscreen](https://github.com/zedwang/iCloud/blob/master/screenshots/main.png?raw=true)

 > electron的官方脚手架只是一个demo，并没有完全的基于业务实现。所以，想通过此项目来系统的接触。其实不太需要真实的API,所以并不不会考虑文件的传输问题（当然要对接一些云也是可以的）。
 > 关于UI的细节也没有花太多精力，那些都是体力活，模仿的百度云仅用于学习。主要是强调生产的过程，比如项目的工程化，托盘处理，自动更新、跨平台打包、网络检测，发布到平台等等这样原生功能。

## Dev

 1. fork仓库，安装依赖包

```shell
    yarn install
```

 1. 启动

```shell
    yarn start
```

 1. 打包调试

 ```shell
    yarn package:win
 ```

 1. 编译安装包

 ```shell
    yarn release
 ```

## TODOS

* [x] 拖拽窗口
* [ ] 网络检测
* [ ] 自动更新
* [ ] 系统通知

## 注意事项

 1. electron不同于普通的web程序，涉及到进程通信，所以在webpack编译的时候要配置  `target: 'electron-renderer'`
 1. 比较常见的就是es6`class`this的绑定问题，一般有三种方式解决：
    * 在`constructor`手动bind，或者用`auto-bind`这个报来自动绑定
    * 在调用的地方bind，`<button onClick={this.handleClick.bind(this)}>click me</button>`
    * 不定义方法类成员方法，定义成类的属性`handleClick = () => {....}`
 1. `babel7`修饰符插件的问题。修饰符插件和类属性插件顺序很重要,`@babel/plugin-proposal-class-properties`插件必须开启`loose`模式,否则就会出现mobx不会刷新组件
 1. `Not allowed load local resource`错误。
    * 检查文件是否存在，或者路劲是否正确
    * 可以在`BrowserWindow()`中关闭安全策略
    ```js
    {
        webPreferences: {
            webSecurity: false
        }
    }
    ```
    * 因为运行的环境是nodejs，所以在Webpack配置中要保证`__dirname`行为输出的是常规的文件目录
    ```js
        node: {
            __dirname: false
        }
    ```
 1. 打包体积问题。electron打包的东西出来通常体积比较大，那是因为包含了一个chromuin浏览器和node在里面。但是我们开发的环境中node_modules的体积也是很庞大的。所以我们可以main.js也进行打包，这样就可以不出现冗余的node_modules包。注意的是，在编译main的时候webpack的target要配置为`electron-main`
 1. 字体乱码的问题。这个问题比较2，就是缺少了`<meta charset="UTF-8">`的声明
 1. `electron-packager`适合打包调试，推荐`electron-builder`
 1. 要自动更新必须要打nupkg类型的包，`linux`平台并不支持自动更新
 1. 一般情况下在render进程中通过remote接口去拿main进程的模块，可以不用显示的发事件

## 体会

 1. MobX vs Redux
 2. Electron
