
<p align="center">
<h1 align="center">gmfe</h1>
<div align="center">观麦老架构组件库，采用lerna分包管理，👉 <a target="_blank" href="https://gmfe.github.io/gmfe-docs">预览地址</a></div>
</p>

<div align="center">


 [![NPM version][npm-image]][npm-url] ![NPM downloads][download-image]

[npm-image]: https://img.shields.io/npm/v/@gmfe/react.svg?style=flat-square
[npm-url]: http://npmjs.org/package/@gmfe/react


[download-image]: https://img.shields.io/npm/dm/@gmfe/react.svg?style=flat-square
[download-url]: https://npmjs.org/package/@gmfe/react


</div>

## ⌨️ 本地开发

```
git clone git@github.com:gmfe/gmfe.git
cd gmfe
# 安装依赖
yarn

# 各个包的依赖安装
lerna bootstrap

# 项目启动
yarn start
```
打开浏览器访问 http://localhost:7000

在每个文件夹下面的 `stories.tsx` 编写示例代码

## ✨ 一些主要的packages

### @gmfe/business

这里存放和业务强相关的组件

### @gmfe/locales

处理多语言的

### @gmfe/react

组件库

### @gmfe/table-x

列表相关的

### @gmfe/keyboard

键盘操作相关的


🔨 示例

```jsx
import { Button, Input } from '@gmfe/react'
const App = () => (
  <>
    <Button type="primary">点击</Button>
    <Input />
  </>
);
```
