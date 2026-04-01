# Calendar

## 简介
日历组件 - 提供单日期选择和日期范围选择两种模式，通过 Calendar（单选）和 RangeCalendar（范围选择）两个组件实现。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Calendar } from '@gmfe/react'

<Calendar
  selected={date}
  onSelect={date => setDate(date)}
/>
```

## API

### Calendar Props（单选）
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| selected | 当前选中的日期，Date 对象 | `object` | - | 否 |
| onSelect | 日期选中回调，参数为 Date 对象 | `func` | `_.noop` | 否 |
| willActiveSelected | 键盘操作时的高亮日期 | `object` | - | 否 |
| onWillActiveSelected | 高亮日期变化回调，参数为 Date 对象 | `func` | - | 否 |
| min | 可选的最小日期，Date 对象 | `object` | - | 否 |
| max | 可选的最大日期，Date 对象 | `object` | - | 否 |
| disabledDate | 自定义日期是否可选，参数为 Date 对象，返回 bool。设置后 min/max 无效 | `func` | - | 否 |
| onKeyDown | 键盘事件回调 | `func` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### RangeCalendar Props（范围选择）
RangeCalendar 继承自 Calendar，额外属性如下：

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| begin | 开始日期，Date 对象 | `object` | - | 否 |
| end | 结束日期，Date 对象 | `object` | - | 否 |
| onSelect | 选中回调，参数为 (begin, end) | `func` | - | 否 |

## 示例

### 基础日历
```jsx
<Calendar
  selected={date}
  onSelect={date => setDate(date)}
/>
```

### 限制日期范围
```jsx
import moment from 'moment'

<Calendar
  selected={date}
  onSelect={date => setDate(date)}
  min={moment().toDate()}
  max={moment().add(10, 'd').toDate()}
/>
```

### 自定义禁用日期
```jsx
import moment from 'moment'

// 只能选择非周五的日期
<Calendar
  selected={date}
  onSelect={date => setDate(date)}
  disabledDate={d => moment(d).get('day') === 5}
/>
```

### 日期范围选择
```jsx
import { RangeCalendar } from '@gmfe/react'

<RangeCalendar
  begin={beginDate}
  end={endDate}
  onSelect={(begin, end) => {
    setBeginDate(begin)
    setEndDate(end)
  }}
/>
```

## 注意事项
- Calendar 用于单日期选择，RangeCalendar 用于日期范围选择
- `selected`/`begin`/`end` 属性接收 JavaScript 原生 `Date` 对象
- `disabledDate` 设置后，`min` 和 `max` 将失效
- Calendar 组件内部基于 RangeCalendar 实现
- 该组件通常作为 DatePicker 和 DateRangePicker 的内部组件使用，一般不需要直接使用
- 支持键盘上下键切换日期
