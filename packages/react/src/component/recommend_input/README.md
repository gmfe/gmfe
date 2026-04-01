# RecommendInput

## 简介
推荐输入组件 - 输入时展示推荐列表的下拉输入框，支持拼音搜索过滤

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { RecommendInput } from '@gmfe/react'

<RecommendInput
  data={[{ text: '选项1' }, { text: '选项2' }]}
  value={value}
  onChange={value => setValue(value)}
  placeholder="请输入"
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 推荐列表的数据，格式：`[{ text: 'text1' }, { text: 'text2' }, ...]` | `array` | - | 是 |
| value | 输入框的值 | `string` | - | 是 |
| onChange | 值变化回调，参数为 `value` | `function` | - | 是 |
| disabled | 是否禁用 | `bool` | - | 否 |
| listHeight | 推荐列表高度 | `string` | `'180px'` | 否 |
| inputMaxLength | 输入框最大字符数 | `number` | - | 否 |
| placeholder | 占位文本 | `string` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |

## 示例

### 基础用法
```jsx
<RecommendInput
  data={[
    { text: '选项1' },
    { text: '选项2' },
    { text: '选项3' }
  ]}
  value={value}
  onChange={value => setValue(value)}
  placeholder="请输入"
/>
```

### 禁用状态
```jsx
<RecommendInput
  data={data}
  value={value}
  onChange={value => setValue(value)}
  disabled
/>
```

### 限制输入长度
```jsx
<RecommendInput
  data={data}
  value={value}
  onChange={value => setValue(value)}
  inputMaxLength={15}
/>
```

## 注意事项
- 输入时支持拼音搜索过滤推荐列表
- 选择推荐项后会自动关闭下拉列表
- 输入框右侧有清除按钮，点击可清空输入内容
- 弹出框使用 `realFocus` 触发模式，输入框获取焦点时自动展示
