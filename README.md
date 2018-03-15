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

# 坑
 1. 比较常见的就是es6`class`this的绑定问题，一般有三种方式解决：
    - 在`constructor`手动bind，或者用`auto-bind`这个报来自动绑定
    - 在调用的地方bind，`<button onClick={this.handleClick.bind(this)}>click me</button>`
    - 不定义方法类成员方法，定义成类的属性`handleClick = () => {....}`
 1. `babel7`修饰符插件的问题。修饰符插件和类属性插件顺序很重要,`@babel/plugin-proposal-class-properties`插件必须开启`loose`模式,否则就会出现mobx不会刷新组件