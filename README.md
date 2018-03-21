# 仿百度云盘客户端
基于`Electron`,`Webpack3`,`Babel7`,`React16`,`MobX`

 > electron的官方脚手架只是一个demo，并没有完全的基于业务实现。所以，想通过此项目来系统的接触。最开始是准备抓取百度原盘的API，但是这个工程量并不那么轻松，后来我又换了一种思维方式。其实不太需要真实的API,因为我想体验的是这个过程，那么这个后台交互的过程可以mock，所以renderer里面所有的请求都是main里面的mock server。这样就可能专心的关注页面交互了，这个项目会持续不断的更新完善，有兴趣的可以一起加入进来！
# Dev
 1. fork仓库，安装依赖包
```shell
    $ yarn install
```
 1. 启动
```shell
    $ yarn start
```
 1. 打包调试
 ```shell
    $ yarn package:win 
 ```
 1. 编译安装包
 ```shell
    //...未完待续
 ```
# 踩坑日记
 1. electron不同于普通的web程序，涉及到进程通信，所以在webpack编译的时候要配置  `target: 'electron-renderer'`
 1. 比较常见的就是es6`class`this的绑定问题，一般有三种方式解决：
    - 在`constructor`手动bind，或者用`auto-bind`这个报来自动绑定
    - 在调用的地方bind，`<button onClick={this.handleClick.bind(this)}>click me</button>`
    - 不定义方法类成员方法，定义成类的属性`handleClick = () => {....}`
 1. `babel7`修饰符插件的问题。修饰符插件和类属性插件顺序很重要,`@babel/plugin-proposal-class-properties`插件必须开启`loose`模式,否则就会出现mobx不会刷新组件
 1. `Not allowed load local resource`错误。这是因为在编译main进程的时候，webpack默认的配置项只会允许加载`/index.js`,这个时候配置`node: {__dirname: false, __filename: false}`就可以接受任意的文件目录和文件名。
 1. 打包体积问题。electron打包的东西出来通常体积比较大，那是因为包含了一个chromuin浏览器和node在里面。但是我们开发的环境中node_modules的体积也是很庞大的。所以我们可以main.js也进行打包，这样就可以不出现冗余的node_modules包。注意的是，在编译main的时候webpack的target要配置为`electron-main`
 1. 字体乱码的问题。这个问题比较2，就是缺少了`<meta charset="UTF-8">`的声明
 1. `electron-packager`适合打包调试，推荐`electron-builder`

# 体会
 1. MobX vs Redux
    - 
 2. Electron 