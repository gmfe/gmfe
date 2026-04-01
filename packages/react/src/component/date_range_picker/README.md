# DateRangePicker

## 简介
日期范围选择组件 - 提供双日历弹出层选择日期段，支持日期范围限制、时间选择、快速选择列表等功能。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { DateRangePicker } from '@gmfe/react'

<DateRangePicker
  begin={beginDate}
  end={endDate}
  onChange={(begin, end) => {
    setBeginDate(begin)
    setEndDate(end)
  }}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| begin | 开始日期，Date 对象 | `object` | - | 否 |
| end | 结束日期，Date 对象 | `object` | - | 否 |
| onChange | 日期变化回调，参数为 (begin, end) | `func` | `_.noop` | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| min | 可选的最小日期，Date 对象 | `object` | - | 否 |
| max | 可选的最大日期，Date 对象 | `object` | - | 否 |
| disabledDate | 自定义日期是否可选，参数为 Date 对象，返回 bool。设置后 min/max 无效 | `func` | - | 否 |
| renderDate | 自定义日期展示格式，参数为 (begin, end) 两个 Date 对象 | `func` | - | 否 |
| canClear | 是否可清除已选日期 | `bool` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| enabledTimeSelect | 是否启用时间选择 | `bool` | `false` | 否 |
| timeSpan | 时间间隔，默认 30 分钟 | `number` | `1800000`（30分钟） | 否 |
| beginTimeSelect | 开始时间选择限制配置 | `object` | - | 否 |
| beginTimeSelect.defaultTime | 默认开始时间，HH:mm 格式 | `object` | - | 否 |
| beginTimeSelect.disabledSpan | 禁用时间段函数，参数为 Date 对象，返回时间段 | `func` | - | 否 |
| endTimeSelect | 结束时间选择限制配置 | `object` | - | 否 |
| endTimeSelect.defaultTime | 默认结束时间 | `object` | - | 否 |
| endTimeSelect.disabledSpan | 禁用时间段函数 | `func` | - | 否 |
| customQuickSelectList | 自定义左侧快速选择列表 | `array` | - | 否 |
| children | 自定义触发元素 | `any` | - | 否 |

### 方法（通过 ref 调用）
| 方法 | 说明 |
|------|------|
| apiDoFocus | 聚焦到日期范围选择框 |

## 示例

### 基础用法
```jsx
<DateRangePicker
  begin={beginDate}
  end={endDate}
  onChange={(begin, end) => {
    setBeginDate(begin)
    setEndDate(end)
  }}
/>
```

### 带清除功能
```jsx
<DateRangePicker
  begin={beginDate}
  end={endDate}
  canClear
  onChange={(begin, end) => {
    setBeginDate(begin)
    setEndDate(end)
  }}
/>
```

### 启用时间选择
```jsx
<DateRangePicker
  begin={beginDate}
  end={endDate}
  enabledTimeSelect
  onChange={(begin, end) => {
    setBeginDate(begin)
    setEndDate(end)
  }}
/>
```

### 自定义快速选择列表
```jsx
const quickList = [
  {
    range: [[0, 'day'], [0, 'day']],
    text: '今天'
  },
  {
    range: [[-7, 'day'], [0, 'day']],
    text: '最近7天'
  }
]

<DateRangePicker
  begin={beginDate}
  end={endDate}
  customQuickSelectList={quickList}
  onChange={(begin, end) => {
    setBeginDate(begin)
    setEndDate(end)
  }}
/>
```

## 注意事项
- `begin` 和 `end` 属性接收 JavaScript 原生 `Date` 对象
- 不设置 `renderDate` 时，默认展示格式为 `YYYY-MM-DD ~ YYYY-MM-DD`
- 启用 `enabledTimeSelect` 时，展示格式自动带上时间部分
- `disabledDate` 设置后，`min` 和 `max` 将失效
- `customQuickSelectList` 的 `range` 数组项格式为 `[距离天数, 'day']`，从当前日期推算
- 选择日期后需要点击"确定"按钮才会触发 `onChange`
- 点击"取消"会关闭弹窗且不触发回调
- `canClear` 为 true 时，选中状态下可以通过清除按钮清空日期范围
