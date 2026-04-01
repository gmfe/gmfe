# @gmfe/locales

## 简介

`@gmfe/locales` 是 gmfe 组件库的国际化工具包，用于管理多语言翻译。内置支持简体中文（zh）、繁体中文（zh-HK）、英文（en）和泰语（th）四种语言，语言偏好会自动持久化到 `localStorage`。

## 安装

```bash
npm install @gmfe/locales
```

## 使用

```js
import { getLocale, setLocale, setLocaleAndStorage } from '@gmfe/locales'

// 设置语言并持久化到 localStorage
setLocaleAndStorage('en')

// 获取翻译文本
const text = getLocale('确认') // 根据当前语言返回对应翻译
```

## API

### getLocale(text)

根据当前语言设置获取翻译文本。

**参数：**

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| text | 需要翻译的文本 key，支持 `__` 分隔符的 key 格式 | `string` | 是 |

**返回值：** `string`

- 如果在当前语言的翻译映射中找到了对应 key，则返回翻译后的文本。
- 如果未找到，则取 `__` 分隔符最后一段作为 fallback 返回。
- 默认语言为 `zh`（简体中文）。

### setLocale(lng)

设置当前语言（仅修改内存中的状态，不会持久化）。

**参数：**

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| lng | 语言代码 | `'zh' \| 'zh-HK' \| 'en' \| 'th'` | 是 |

### setLocaleAndStorage(lng)

设置当前语言，并同时将语言偏好保存到 `localStorage`。

**参数：**

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| lng | 语言代码 | `'zh' \| 'zh-HK' \| 'en' \| 'th'` | 是 |

## 示例

### 基本语言切换

```js
import { getLocale, setLocaleAndStorage } from '@gmfe/locales'

setLocaleAndStorage('en')
console.log(getLocale('确认')) // 'Confirm'

setLocaleAndStorage('zh-HK')
console.log(getLocale('确认')) // 繁体中文翻译结果
```

### 在 React 应用中配合使用

```jsx
import React from 'react'
import { getLocale, setLocaleAndStorage } from '@gmfe/locales'

function LanguageSelector() {
  const languages = [
    { value: 'zh', label: '简体中文' },
    { value: 'zh-HK', label: '繁體中文' },
    { value: 'en', label: 'English' },
    { value: 'th', label: 'ไทย' }
  ]

  return (
    <select
      onChange={(e) => {
        setLocaleAndStorage(e.target.value)
        window.location.reload()
      }}
    >
      {languages.map(lang => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  )
}
```

### 使用 key 分隔符

```js
import { getLocale } from '@gmfe/locales'

// 使用双下划线分隔模块名和文本名
// 如果翻译不存在，会取最后一段作为默认值
const saveText = getLocale('order__保存订单') // 找不到时返回 '保存订单'
```

## 注意事项

- 翻译 JSON 文件（`zh.json`、`en.json` 等）由脚本自动生成，不建议手动修改。
- 语言偏好存储在 `localStorage` 中，key 为 `_gmfe_locales_lng_`，清除浏览器缓存后语言设置会重置为默认的 `zh`。
- `setLocale` 仅在当前会话生效，页面刷新后语言会恢复为 `localStorage` 中保存的值。如需持久化，请使用 `setLocaleAndStorage`。
- 当翻译 key 在当前语言映射中不存在时，`getLocale` 会取 `__` 分隔符的最后一段作为返回值。