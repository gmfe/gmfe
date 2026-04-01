# Box / BoxForm / BoxTable / BoxPanel

## 简介
内容容器组件集 - 提供多种常用内容包裹容器，包括基础容器、表单容器、表格容器和面板容器

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Box, BoxForm, BoxTable, BoxPanel } from '@gmfe/react'

// 基础容器
<Box hasGap>内容区域</Box>

// 表单容器
<BoxForm>表单内容</BoxForm>

// 表格容器
<BoxTable info={<BoxTable.Info>标题</BoxTable.Info>} action={<div>操作</div>}>
  表格内容
</BoxTable>

// 面板容器
<BoxPanel title="商品明细">面板内容</BoxPanel>
```

## API

### Box Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| hasGap | 是否添加内边距 | `bool` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### BoxForm Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 表单内容（需用 `FormBlock` 包裹） | `node` | - | 否 |

### BoxForm.More
| 属性 | 说明 | 类型 | 必填 |
|------|------|------|------|
| children | 展开后的额外表单内容 | `node` | 否 |

`BoxForm.More` 可在表单区域和按钮区域重复使用，表示需要展开后才显示的内容。

### BoxTable Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| info | 左侧标题区域 | `element` | - | 否 |
| action | 右侧操作区域 | `element` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| headerProps | 头部区域的自定义属性 | `object` | `{}` | 否 |

### BoxTable.Info
| 属性 | 说明 | 类型 | 必填 |
|------|------|------|------|
| children | 信息内容 | `node` | 否 |
| className | 自定义类名 | `string` | 否 |
| style | 自定义样式 | `object` | 否 |

### BoxPanel Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 面板标题 | `string` | - | 是 |
| collapse | 折叠功能，`undefined` 为无此功能，`false` 默认收起，`true` 默认展开 | `bool` | - | 否 |
| summary | 汇总信息，数组格式：`[{text, value}]` 或 element | `array \| element` | - | 否 |
| right | 右侧内容区域 | `element` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### Box 基础容器
```jsx
<Box>带边框的内容区域</Box>
<Box hasGap>带内边距的内容区域</Box>
```

### BoxForm 表单容器
```jsx
<BoxForm btnPosition="left">
  <FormBlock col={3}>
    <FormItem label="商品">
      <input type="text" />
    </FormItem>
  </FormBlock>
  <BoxForm.More>
    <FormBlock col={3}>
      <FormItem label="额外字段">
        <input type="text" />
      </FormItem>
    </FormBlock>
  </BoxForm.More>
  <FormButton>
    <Button type="primary" htmlType="submit">搜索</Button>
    <BoxForm.More>
      <Button type="link">重置</Button>
    </BoxForm.More>
  </FormButton>
</BoxForm>
```

### BoxTable 表格容器
```jsx
<BoxTable
  info={<BoxTable.Info>这是标题</BoxTable.Info>}
  action={<div>操作按钮</div>}
>
  <div>表格内容</div>
</BoxTable>
```

### BoxPanel 面板容器
```jsx
// 基础面板
<BoxPanel title="商品明细">
  面板内容
</BoxPanel>

// 带折叠和汇总
<BoxPanel
  title="商品明细"
  collapse
  summary={[
    { text: '共计', value: 2 },
    { text: '合计', value: '¥23,389.00' }
  ]}
  right={<div>操作区域</div>}
>
  面板内容
</BoxPanel>
```

## 注意事项
- 所有 Box 容器默认带边框样式
- `BoxForm` 中展开的内容需使用 `BoxForm.More` 包裹，内部使用 Context 通信
- `BoxForm.More` 可以在表单区域和按钮区域重复出现，表示"高级筛选"区域
- `BoxPanel` 的 `summary` 汇总信息以逗号分隔展示，最后一项后无逗号
