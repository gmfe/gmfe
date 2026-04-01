# NProgress

## 简介
页面顶部进度条组件 - 在页面顶部显示加载进度条，适用于路由切换或异步请求时的全局加载指示，支持多次 start/done 的计数管理

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { NProgress } from '@gmfe/react'
```

## API

### 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `NProgress.start()` | 开始显示进度条，内部维护计数器，多次调用不会重复显示 | - | - |
| `NProgress.done()` | 完成并隐藏进度条，每次调用减少计数器，计数归零时才真正隐藏 | - | - |

## 示例

### 基础用法

```jsx
import { NProgress } from '@gmfe/react'

// 开始加载
NProgress.start()

// 加载完成后
NProgress.done()
```

### 配合 axios 请求拦截器使用

```jsx
import axios from 'axios'
import { NProgress } from '@gmfe/react'

// 请求拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})

// 响应拦截器
axios.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  error => {
    NProgress.done()
    return Promise.reject(error)
  }
)
```

### 配合 React Router 路由切换使用

```jsx
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { NProgress } from '@gmfe/react'

function App() {
  return (
    <BrowserRouter>
      <Route
        render={({ location }) => {
          NProgress.start()
          return (
            <Switch location={location}>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
            </Switch>
          )
        }}
      />
    </BrowserRouter>
  )
}

// 在页面组件中完成后调用
function Home() {
  React.useEffect(() => {
    NProgress.done()
  }, [])

  return <div>首页</div>
}
```

### 并发请求

```jsx
// 多次 start 只会显示一个进度条
NProgress.start() // 计数: 1
NProgress.start() // 计数: 2
NProgress.start() // 计数: 3

// 每次 done 减少计数
NProgress.done() // 计数: 2, 进度条仍在
NProgress.done() // 计数: 1, 进度条仍在
NProgress.done() // 计数: 0, 进度条隐藏
```

### 配合 Promise.all 多个请求

```jsx
async function loadPageData() {
  NProgress.start()
  try {
    const [users, orders, products] = await Promise.all([
      api.getUsers(),
      api.getOrders(),
      api.getProducts()
    ])
    // 处理数据...
  } finally {
    NProgress.done()
  }
}
```

## 注意事项

- NProgress 使用内部计数器管理进度条的显示和隐藏，支持并发场景。多次调用 `start()` 只会显示一个进度条，需要相同次数的 `done()` 才会隐藏。
- 进度条完成后会有 250ms 的完成动画，然后才从 DOM 中移除。
- 进度条渲染到 `LayoutRoot` 中，位于页面顶部，通常不需要手动定位。
- 进度条有两种 CSS 状态：`gm-nprogress-loading`（加载中）和 `gm-nprogress-completed`（完成）。
- 不支持组件形式的调用，仅提供静态方法。
