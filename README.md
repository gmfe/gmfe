
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

## 📦 发版流程

本项目使用 [Lerna](https://lerna.js.org/) 管理多包版本，采用 **固定版本模式**（所有包版本保持一致），通过 GitHub Actions 自动发布到 npm。

### 一键发版

```bash
yarn release
```

该命令会自动完成以下步骤：
1. 读取 `lerna.json` 当前版本号并自动 +1
2. 使用 `lerna version` 统一更新所有包版本
3. 提交并推送到 master

推送后 GitHub Actions 会自动触发发布流程（`.github/workflows/release.yml`），将所有包发布到 npm。

### 验证发布结果

```bash
npm view @gmfe/react version
```

### 环境要求

| 工具 | 版本 |
|------|------|
| Node.js | >= 20.19.0 |
| Yarn | 1.x |
| Lerna | 9.0.7 |

### 注意事项

- 所有包版本保持一致，修改版本号时使用 `lerna version` 统一管理，**不要手动逐个修改**
- 发布到 npm registry: `https://registry.npmjs.org`
- 本地不要使用 `npm install`，统一使用 `yarn` 管理依赖

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
