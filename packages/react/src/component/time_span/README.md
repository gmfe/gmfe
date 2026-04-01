# TimeSpan / TimeSpanPicker

## 简介
时间跨度选择组件 - TimeSpan 提供时间点选择面板，TimeSpanPicker 提供带输入框的时间选择器

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { TimeSpan, TimeSpanPicker } from '@gmfe/react'

// 直接使用时间面板
<TimeSpan
  selected={date}
  onSelect={date => setDate(date)}
/>

// 带输入框的时间选择器
<TimeSpanPicker
  date={date}
  onChange={date => setDate(date)}
/>
```

## API

### TimeSpan Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| min | 可选的最小时间（Date 对象），默认一天的开始时间 | `object` | 当天 `00:00` | 否 |
| max | 可选的最大时间（Date 对象），默认一天的结束时间 | `object` | 当天 `23:59` | 否 |
| disabledSpan | 禁用时间段函数，参数为 Date 对象，返回 `boolean` | `function` | - | 否 |
| span | 时间跨度（毫秒），默认为 30 分钟 | `number` | `1800000` (30分钟) | 否 |
| selected | 当前选中的时间（Date 对象） | `object` | - | 否 |
| renderItem | 渲染时间文本格式 | `function` | `(value) => moment(value).format('HH:mm')` | 否 |
| onSelect | 选中回调，参数为 Date 对象 | `function` | `_.noop` | 否 |
| beginTime | 自定义起始时间点（Date 对象），不传默认从 00:00 开始 | `object` | - | 否 |
| endTime | 自定义结束时间点（Date 对象） | `object` | - | 否 |
| enabledEndTimeOfDay | 是否展示 24:00 结束时间 | `bool` | `false` | 否 |

### TimeSpanPicker Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| date | 当前选中的时间（Date 对象） | `object` | - | 是 |
| onChange | 选中回调，参数为 Date 对象 | `function` | `_.noop` | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| min | 可选的最小时间（Date 对象） | `object` | - | 否 |
| max | 可选的最大时间（Date 对象） | `object` | - | 否 |
| span | 时间跨度（毫秒），默认为 30 分钟 | `number` | `1800000` (30分钟) | 否 |
| disabledSpan | 禁用时间段函数，参数为 Date 对象，返回 `boolean` | `function` | - | 否 |
| renderItem | 渲染时间文本格式 | `function` | `(value) => moment(value).format('HH:mm')` | 否 |
| beginTime | 自定义起始时间点（Date 对象） | `object` | - | 否 |
| endTime | 自定义结束时间点（Date 对象） | `object` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| children | 自定义触发器元素 | `any` | - | 否 |
| isInPopup | 是否嵌套在其他弹出层中 | `bool` | `false` | 否 |
| enabledEndTimeOfDay | 是否展示 24:00 结束时间 | `bool` | `false` | 否 |

## 示例

### TimeSpan 基础用法
```jsx
<TimeSpan
  selected={date}
  onSelect={date => setDate(date)}
/>
```

### TimeSpan 禁用时间段
```jsx
<TimeSpan
  max={moment().hour(20).minute(0)}
  disabledSpan={spanMoment =>
    spanMoment.isSameOrAfter(moment('11:00', 'HH:mm')) &&
    spanMoment.isSameOrBefore(moment('18:30', 'HH:mm'))
  }
  selected={date}
  onSelect={date => setDate(date)}
/>
```

### TimeSpan 自定义时间跨度
```jsx
<TimeSpan
  span={60 * 60 * 1000} // 1小时
  renderItem={value => moment(value).format('HH')}
  selected={date}
  onSelect={date => setDate(date)}
/>
```

### TimeSpanPicker 基础用法
```jsx
<TimeSpanPicker
  date={date}
  onChange={date => setDate(date)}
/>
```

### TimeSpanPicker 自定义触发器
```jsx
<TimeSpanPicker date={date} onChange={date => setDate(date)}>
  <span>{date ? moment(date).format('HH:mm') : '请点击选择'}</span>
</TimeSpanPicker>
```

## 注意事项
- 时间面板分三列展示，时间间隔较大时，某一列可能无数据
- `TimeSpanPicker` 内部使用 `Popover` 和 `Selection` 组件
- `disabledSpan` 可用于禁用特定时间段（如午休时间）
