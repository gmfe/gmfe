# Dialog

## 简介
对话框组件 - 用于显示模态对话框，支持 alert、confirm、prompt 三种类型，提供 Promise 风格的 API 调用方式

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Dialog } from '@gmfe/react'
```

## API

### 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `Dialog.alert(options)` | 显示警告对话框，只有确认按钮 | `options: Object` | `Promise` |
| `Dialog.confirm(options)` | 显示确认对话框，有取消和确认按钮 | `options: Object` | `Promise` |
| `Dialog.prompt(options)` | 显示输入对话框，包含输入框 | `options: Object` | `Promise` |

### 静态方法 Options

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 对话框标题 | `string` | `'提示'` | 否 |
| children | 对话框内容 | `any` | - | 否 |
| type | 对话框类型 | `'alert' \| 'confirm' \| 'prompt'` | `'confirm'` | 否 |
| size | 对话框尺寸 | `'lg' \| 'md' \| 'sm'` | `'sm'` | 否 |
| OKBtn | 确认按钮文字，传 `false` 则不显示 | `string \| false` | `'确定'` | 否 |
| cancelBtn | 取消按钮文字，传 `false` 则不显示 | `string \| false` | `'取消'` | 否 |
| onOK | 点击确认按钮的回调，`prompt` 类型下会接收输入框的值作为参数；返回 `false` 可阻止关闭，返回 `Promise` 可显示 loading 状态 | `function(value?: string)` | - | 否 |
| disableMaskClose | 是否禁止点击遮罩关闭 | `bool` | `false` | 否 |
| promptDefaultValue | prompt 类型下输入框的默认值 | `string` | - | 否 |
| promptPlaceholder | prompt 类型下输入框的占位文字 | `string` | - | 否 |

### 组件 Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| show | 是否显示 | `bool` | `false` | 是 |
| title | 对话框标题 | `string` | `'提示'` | 否 |
| type | 对话框类型 | `string` | `'confirm'` | 否 |
| size | 对话框尺寸 | `string` | `'md'` | 否 |
| children | 对话框内容 | `any` | - | 否 |
| onCancel | 取消回调 | `func` | - | 否 |
| onOK | 确认回调 | `func` | - | 否 |
| promptDefaultValue | prompt 类型下输入框的默认值 | `string` | - | 否 |
| promptPlaceholder | prompt 类型下输入框的占位文字 | `string` | - | 否 |
| cancelBtn | 取消按钮文字 | `string \| bool` | `'取消'` | 否 |
| OKBtn | 确认按钮文字 | `string \| bool` | `'确定'` | 否 |
| disableMaskClose | 是否禁止点击遮罩关闭 | `bool` | `false` | 否 |

## 示例

### 基础用法 - Alert

```jsx
Dialog.alert({
  children: '操作成功！'
}).then(() => {
  console.log('确认')
})
```

### 确认对话框

```jsx
Dialog.confirm({
  title: '确认删除',
  children: '删除后数据将无法恢复，是否继续？'
}).then(
  () => console.log('确认'),
  () => console.log('取消')
)
```

### 输入对话框

```jsx
Dialog.prompt({
  title: '请输入名称',
  promptDefaultValue: '默认值',
  onOK: value => {
    console.log('输入值：', value)
  }
}).then(
  value => console.log('确认:', value),
  () => console.log('取消')
)
```

### 异步 Loading 状态

```jsx
Dialog.confirm({
  title: '提交确认',
  children: '确定要提交吗？',
  onOK: () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 1000)
    })
  }
}).then(() => {
  console.log('提交成功')
})
```

### 嵌套对话框

```jsx
// 同步嵌套
const openDialog1 = () => {
  Dialog.confirm({
    title: '对话框1',
    children: '对话框1内容'
  }).then(() => {
    openDialog2()
  })
}

// 异步嵌套（需要 setTimeout）
const openAsyncDialog1 = () => {
  Dialog.confirm({
    title: '对话框1',
    children: '对话框1内容',
    onOK() {
      return new Promise(resolve => {
        setTimeout(() => resolve(), 2000)
      }).then(() => {
        setTimeout(() => {
          // 必须加 setTimeout
          openDialog2()
        })
      })
    }
  })
}
```

## 注意事项

- **推荐使用静态方法调用**：建议始终使用 `Dialog.alert()`、`Dialog.confirm()`、`Dialog.prompt()` 静态方法，而非以组件形式使用。以组件形式调用时会产生警告信息。
- **Promise 风格**：静态方法返回 `Promise`，`.then()` 对应确认操作，`.catch()` 或第二个参数对应取消操作。
- **阻止关闭**：`onOK` 回调返回 `false` 可以阻止对话框关闭。
- **异步操作**：`onOK` 回调返回 `Promise` 时，确认按钮会自动显示 loading 状态，等待 Promise resolve 后关闭对话框。如果 Promise reject，loading 状态会取消。
- **嵌套对话框**：异步嵌套打开下一个对话框时，必须在 Promise resolve 后使用 `setTimeout` 包裹，否则可能出现渲染问题。
