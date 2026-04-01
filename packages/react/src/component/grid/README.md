# Grid

## 简介
栅格布局组件 - 基于 24 栅格系统的响应式布局组件，包含 Row 和 Col 两个子组件。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Row, Col } from '@gmfe/react/lib/grid'

<Row>
  <Col span={12}>左侧</Col>
  <Col span={12}>右侧</Col>
</Row>
```

## API

### Row Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| gutter | 栅格间隔，可传入像素值或响应式对象 `{ xs: 8, sm: 16, md: 24 }` | `number \| object` | `0` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

Row 组件继承 Flex 组件的所有属性（`row` 和 `wrap` 已默认开启）。

### Col Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| span | 栅格占位格数，为 0 时相当于 `display: none` | `number` | - | 否 |
| offset | 栅格左侧的间隔格数 | `number` | - | 否 |
| sm | 768px 响应式栅格，可为栅格数或包含 span/offset 的对象 | `number \| {span, offset}` | - | 否 |
| md | 992px 响应式栅格，可为栅格数或包含 span/offset 的对象 | `number \| {span, offset}` | - | 否 |
| lg | 1200px 响应式栅格，可为栅格数或包含 span/offset 的对象 | `number \| {span, offset}` | - | 否 |
| xl | 1920px 响应式栅格，可为栅格数或包含 span/offset 的对象 | `number \| {span, offset}` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |

## 示例

### 基础用法
```jsx
// 占满 24 栅格
<Row>
  <Col span={24}>Col 24</Col>
</Row>

// 三等分
<Row>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
</Row>

// 左偏移
<Row>
  <Col span={8}>Col 8</Col>
  <Col span={8} offset={8}>Col 8, Offset 8</Col>
</Row>
```

### 响应式布局
```jsx
<Row>
  <Col sm={{ span: 4, offset: 4 }} md={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} xl={8}>
    Col
  </Col>
  <Col sm={{ span: 4, offset: 4 }} md={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }} xl={8}>
    Col
  </Col>
  <Col sm={{ span: 4, offset: 4 }} md={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} xl={8}>
    Col
  </Col>
</Row>
```

### 间隔设置
```jsx
<Row gutter={8}>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
  <Col span={8}>Col 8</Col>
</Row>
```

## 注意事项
- 栅格系统基于 24 格
- Row 组件默认开启了 `row`（水平排列）和 `wrap`（自动换行）属性
- 响应式断点：`sm` = 768px, `md` = 992px, `lg` = 1200px, `xl` = 1920px
- `span` 设为 0 时，该列不会显示（相当于 `display: none`）
- 设置 `gutter` 后，Col 会自动添加左右内边距
