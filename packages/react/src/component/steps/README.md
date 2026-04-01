# Steps

## 简介
步骤条组件 - 展示操作流程的当前步骤进度，支持标题和描述信息。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import Steps from '@gmfe/react/lib/steps'

<Steps
  data={[
    { title: '第一步' },
    { title: '第二步', description: '这是第二步的描述' },
    { title: '第三步', description: '这是第三步的描述' }
  ]}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 步骤数据数组 | `{ title?: string, description?: string }[]` | - | 是 |
| className | 自定义类名 | `string` | - | 否 |

data 数组中每项的字段：

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| title | 步骤标题 | `string` | 否 |
| description | 步骤描述 | `string` | 否 |

## 示例

### 基础用法
```jsx
<Steps
  data={[
    { title: '第一步' },
    { title: '第二步', description: '这是第二步' },
    { title: '第三步', description: '这是第三步' },
    { title: '第四步', description: '这是第四步' }
  ]}
  style={{ width: '300px' }}
/>
```

## 注意事项
- 步骤条为垂直方向排列
- 每个步骤自动显示序号（从 1 开始）
- title 和 description 均为可选，可以只传 title 不传 description
