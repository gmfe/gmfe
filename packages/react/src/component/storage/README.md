# Storage

## 简介
本地存储组件 - 基于 localStorage 的封装，提供组件式和静态方法两种使用方式

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用

### 组件方式
```jsx
import { Storage } from '@gmfe/react'

<Storage name="myKey" value={myValue} />
```

### 静态方法方式
```jsx
import { Storage } from '@gmfe/react'

Storage.set('key', 'value')
Storage.get('key')
Storage.remove('key')
```

## API

### 组件 Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| name | 存储的键名 | `string` | - | 是 |
| value | 存储的值，支持 `string`、`object`、`array` | `string \| object \| array` | - | 否 |

### 静态方法
| 方法 | 说明 | 参数 |
|------|------|------|
| `Storage.set(key, value)` | 设置存储值 | `key: string, value: any` |
| `Storage.get(key)` | 获取存储值 | `key: string` |
| `Storage.remove(key)` | 删除指定存储 | `key: string` |
| `Storage.clear()` | 清除本域名全部存储（慎用） | - |
| `Storage.getAll()` | 获取全部存储，以对象形式返回 | - |

## 示例

### 实时存储
```jsx
function App() {
  const [data, setData] = useState('hello')
  return (
    <div>
      <input
        type="text"
        value={data}
        onChange={e => setData(e.target.value)}
      />
      <Storage name="test" value={data} />
    </div>
  )
}
```

### 静态方法
```jsx
// 设置值
Storage.set('username', '张三')
Storage.set('settings', { theme: 'dark', lang: 'zh' })

// 获取值
Storage.get('username') // '张三'

// 删除
Storage.remove('username')

// 获取全部
Storage.getAll() // { settings: { theme: 'dark', lang: 'zh' } }
```

## 注意事项
- 所有存储的 key 会自动添加 `_react-gm_` 前缀，避免与其他存储冲突
- 组件方式会在 `value` 变化时自动更新存储
- `Storage.clear()` 会清除本域名下全部 localStorage，请谨慎使用
- 内部使用 `JSON.stringify` / `JSON.parse` 序列化，支持存储对象和数组
