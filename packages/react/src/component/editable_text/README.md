# EditableText

## 简介
可编辑文本组件 - 点击文本切换为编辑模式，支持确认和取消操作

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { EditableText } from '@gmfe/react'

<EditableText
  content="可编辑的文本"
  onOk={value => console.log('确认:', value)}
  onCancel={() => console.log('取消')}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| content | 组件显示的文本内容 | `string` | - | 是 |
| onOk | 确认回调，参数为编辑后的文本值 | `function` | - | 否 |
| onCancel | 取消回调 | `function` | - | 否 |
| disabled | 是否禁用编辑 | `bool` | - | 否 |
| children | 自定义显示内容，优先级高于 `content` | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |

## 示例

### 基础用法
```jsx
<EditableText
  content="可编辑的文本"
  onOk={value => setContent(value)}
/>
```

### 禁用编辑
```jsx
<EditableText
  content="不可编辑"
  onOk={value => setContent(value)}
  disabled
/>
```

### 自定义显示内容
```jsx
<EditableText onOk={value => setContent(value)} content={content}>
  <Popover
    showArrow
    top
    type="hover"
    popup={<div className="gm-border gm-padding-5">来源：{content}</div>}
  >
    <div className="gm-inline-block">{content}</div>
  </Popover>
</EditableText>
```

## 注意事项
- 按回车键可确认编辑
- 点击确认按钮或输入框失焦时触发取消操作（失焦有 300ms 延迟以避免与按钮点击冲突）
- 禁用状态下不会显示编辑图标
