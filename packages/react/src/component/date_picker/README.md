# DatePicker

## 简介
日期选择组件 - 提供日历弹出层选择日期，支持日期范围限制、不可选日期设置、自定义展示格式和时间选择功能。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { DatePicker } from '@gmfe/react'

<DatePicker
  date={date}
  placeholder='请选择日期'
  onChange={date => setDate(date)}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| date | 当前选中的日期，Date 对象 | `object` | - | 否 |
| onChange | 日期选择回调，参数为 Date 对象 | `func` | - | 是 |
| placeholder | 占位文字 | `string` | - | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| min | 可选的最小日期，Date 对象 | `object` | - | 否 |
| max | 可选的最大日期，Date 对象 | `object` | - | 否 |
| disabledDate | 定义不可选择的日期，参数为 Date 对象，返回 true 不可选 | `func` | - | 否 |
| renderDate | 自定义日期显示格式，参数为 Date 对象，返回展示内容 | `func` | - | 否 |
| renderBottom | 添加底部自定义组件 | `element` | - | 否 |
| popoverType | 弹出层触发方式 | `'focus' \| 'realFocus'` | - | 否 |
| enabledTimeSelect | 是否启用时间选择 | `bool` | `false` | 否 |
| timeLimit | 时间选择限制配置 | `object` | - | 否 |
| timeLimit.defaultTime | 默认时间，HH:mm 格式 | `object` | - | 否 |
| timeLimit.disabledSpan | 禁用时间段函数，参数为 Date 对象，返回 bool | `func` | - | 否 |
| timeLimit.timeSpan | 时间间隔，默认 30 分钟 | `number` | `1800000`（30分钟） | 否 |
| onKeyDown | 键盘事件回调 | `func` | `_.noop` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| children | 自定义触发元素 | `any` | - | 否 |

### 方法（通过 ref 调用）
| 方法 | 说明 |
|------|------|
| apiDoFocus | 聚焦到日期选择框 |
| apiDoSelectWillActive | 选择键盘高亮的当前日期 |

## 示例

### 基础用法
```jsx
<DatePicker
  date={date}
  placeholder='请选择日期'
  onChange={date => setDate(date)}
/>
```

### 自定义显示格式
```jsx
<DatePicker
  date={date}
  placeholder='请选择日期'
  onChange={date => setDate(date)}
  renderDate={date => `${date.getMonth() + 1}月-${date.getDate()}日`}
/>
```

### 禁用日期选择
```jsx
<DatePicker
  date={date}
  placeholder='请选择日期'
  disabled
  onChange={date => setDate(date)}
/>
```

### 限制可选日期范围
```jsx
// 只能选择今天之后
<DatePicker
  date={date}
  placeholder='选今天之后的'
  min={new Date()}
  onChange={date => setDate(date)}
/>
```

### 自定义禁用日期
```jsx
// 只能选择非周五的日期
<DatePicker
  date={date}
  placeholder='非周五'
  disabledDate={m => moment(m).get('day') === 5}
  onChange={date => setDate(date)}
/>
```

### 带时间选择
```jsx
<DatePicker
  date={date}
  placeholder='请选择日期'
  onChange={date => setDate(date)}
  enabledTimeSelect
/>
```

### 自定义底部内容
```jsx
<DatePicker
  date={date}
  placeholder='请选择日期'
  onChange={date => setDate(date)}
  renderBottom={
    <div className='gm-border-top text-center gm-padding-10'>
      说明：请随便输入时间
    </div>
  }
/>
```

### 自定义触发元素
```jsx
<DatePicker date={date} onChange={date => setDate(date)}>
  <span>
    {date ? moment(date).format('YYYY-MM-DD') : '请点击选择'}
  </span>
</DatePicker>
```

## 注意事项
- `date` 属性接收的是 JavaScript 原生 `Date` 对象
- 不设置 `renderDate` 时，默认展示格式为 `YYYY-MM-DD`；启用 `enabledTimeSelect` 时为 `YYYY-MM-DD HH:mm`
- `disabledDate` 的优先级高于 `min` 和 `max`
- `renderDate` 用于自定义已选日期在输入框中的显示格式
- 启用 `enabledTimeSelect` 后，`renderDate` 需要手动带上时间部分
- 支持键盘上下键切换日期
- `timeLimit.timeSpan` 的单位为毫秒，默认 30 分钟（30 * 60 * 1000）
