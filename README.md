# 仿百度云盘客户端
基于`Electron`,`Webpack3`,`Babel7`,`React16`,`MobX`
### Dev
1. fork仓库，安装依赖包
```shell
    $ yarn install
```
1. 启动
```shell
    $ yarn start
```

# 踩坑日记
 1. electron不同于普通的web程序，涉及到进程通信，所以在webpack编译的时候要配置  `target: 'electron-renderer'`
 1. 比较常见的就是es6`class`this的绑定问题，一般有三种方式解决：
    - 在`constructor`手动bind，或者用`auto-bind`这个报来自动绑定
    - 在调用的地方bind，`<button onClick={this.handleClick.bind(this)}>click me</button>`
    - 不定义方法类成员方法，定义成类的属性`handleClick = () => {....}`
 1. `babel7`修饰符插件的问题。修饰符插件和类属性插件顺序很重要,`@babel/plugin-proposal-class-properties`插件必须开启`loose`模式,否则就会出现mobx不会刷新组件
 1. `Not allowed load local resource`错误。这是因为在编译main进程的时候，webpack默认的配置项只会允许加载`/index.js`,这个时候配置`node: {__dirname: false, __filename: false}`就可以输出任意的文件目录和文件名。
 1. 打包体积问题。electron打包的东西出来通常体积比较大，那是因为包含了一个chromuin浏览器和node在里面。但是我们开发的环境中node_modules的体积也是很庞大的。所以我们可以main.js也进行打包，这样就可以不出现冗余的node_modules包。注意的是，在编译main的时候webpack的target要配置为`electron-main`
 1. 字体乱码的问题。这个问题比较2，就是缺少了`<meta charset="UTF-8">`的声明
 1. `electron-packager`适合打包调试，推荐`electron-builder`