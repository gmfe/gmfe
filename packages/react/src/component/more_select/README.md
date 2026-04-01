# MoreSelect

## 简介
增强选择组件 - 支持单选、多选、分组列表、搜索过滤（含拼音搜索）和远程搜索等功能。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { MoreSelect } from '@gmfe/react'

const list = [
  { value: 1, text: '南山' },
  { value: 2, text: '福田' },
  { value: 3, text: '罗湖' }
]

<MoreSelect
  data={list}
  selected={selected}
  onSelect={item => setSelected(item)}
/>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 选项数据，格式 `[{value, text}]` | `array` | - | 是 |
| selected | 当前选中的项（单选为 item 对象，多选为 item 数组） | `object \| array` | - | 否 |
| onSelect | 选择回调，单选返回 item，多选返回 item 数组 | `func` | - | 是 |
| multiple | 是否多选 | `bool` | - | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| disabledClose | 单选时禁止显示清除按钮 | `bool` | - | 否 |
| placeholder | 占位文字 | `string` | - | 否 |
| searchPlaceholder | 搜索框占位文字 | `string` | - | 否 |
| onSearch | 搜索回调，支持同步（直接返回过滤后的数据）或异步（返回 Promise） | `func` | - | 否 |
| delay | 搜索防抖延迟（毫秒） | `number` | `500` | 否 |
| renderListFilter | 自定义过滤函数，参数为 (data, searchValue) | `func` | - | 否 |
| renderListFilterType | 过滤类型，default 为默认文本匹配，pinyin 为拼音匹配 | `'default' \| 'pinyin'` | `'default'` | 否 |
| renderSelected | 自定义已选项渲染函数，参数为 item | `func` | `item => item.text` | 否 |
| renderListItem | 自定义列表项渲染函数，参数为 item | `func` | `item => item.text` | 否 |
| listHeight | 列表高度 | `string` | `'180px'` | 否 |
| isGroupList | 是否分组列表 | `bool` | - | 否 |
| popoverType | 弹出层触发方式 | `'focus' \| 'realFocus'` | `'focus'` | 否 |
| isInPopup | 是否在弹出层中 | `bool` | - | 否 |
| isEnableChineseCheck | 是否开启中文输入检查 | `bool` | - | 否 |
| isKeyboard | 是否启用全键盘操作 | `bool` | - | 否 |
| onKeyDown | 键盘事件回调 | `func` | `_.noop` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |
| popupClassName | 弹出层自定义类名 | `string` | - | 否 |

### 方法（通过 ref 调用）
| 方法 | 说明 |
|------|------|
| apiDoFocus | 聚焦到选择框 |
| apiDoSelectWillActive | 选择键盘高亮的当前项 |

## 示例

### 单选
```jsx
const list = [
  { value: 1, text: '南山' },
  { value: 2, text: '福田' },
  { value: 3, text: '罗湖' }
]

<MoreSelect
  data={list}
  selected={selected}
  onSelect={selected => setSelected(selected)}
/>
```

### 多选
```jsx
<MoreSelect
  multiple
  data={list}
  selected={mulSelected}
  onSelect={selected => setMulSelected(selected)}
/>
```

### 禁用状态
```jsx
<MoreSelect
  disabled
  data={list}
  selected={selected}
  onSelect={selected => setSelected(selected)}
/>
```

### 拼音搜索
```jsx
<MoreSelect
  data={list}
  selected={selected}
  onSelect={selected => setSelected(selected)}
  renderListFilterType='pinyin'
/>
```

### 远程搜索（异步）
```jsx
<MoreSelect
  data={list}
  selected={selected}
  onSelect={selected => setSelected(selected)}
  onSearch={searchValue => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(list.filter(item => item.text.includes(searchValue)))
      }, 1000)
    })
  }}
/>
```

### 远程搜索（同步）
```jsx
<MoreSelect
  data={list}
  selected={selected}
  onSelect={selected => setSelected(selected)}
  onSearch={searchValue => {
    // 同步直接返回过滤后的数据
    return list.filter(item => item.text.includes(searchValue))
  }}
/>
```

### 分组列表
```jsx
const groupData = [
  {
    label: '南山',
    children: [
      { value: 1, text: '科技园' },
      { value: 2, text: '大冲' }
    ]
  },
  {
    label: '宝安',
    children: [
      { value: 21, text: '西乡' },
      { value: 22, text: '固戍' }
    ]
  }
]

<MoreSelect
  isGroupList
  data={groupData}
  selected={selected}
  onSelect={selected => setSelected(selected)}
/>
```

### 自定义占位文字
```jsx
<MoreSelect
  data={list}
  selected={selected}
  onSelect={selected => setSelected(selected)}
  placeholder='请选择'
  searchPlaceholder='搜索...'
/>
```

## 注意事项
- `selected` 传入的是 item 对象（包含 value 和 text），而非 value 值，这是为了解耦 selected 和 data 的关系
- `onSelect` 回调单选时返回单个 item 对象，多选时返回 item 数组
- `onSearch` 支持同步和异步两种模式：直接返回数组为同步，返回 Promise 为异步
- `renderListFilterType='pinyin'` 时支持中文拼音搜索（全拼和首字母）
- `isEnableChineseCheck` 开启后会监听中文输入法的 composition 事件，避免拼音输入时触发搜索
- 默认搜索防抖延迟为 500ms，可通过 `delay` 属性调整
- 分组列表数据格式为 `[{ label, children: [{value, text}] }]`
- `disabledClose` 仅在单选模式下有效，用于隐藏清除按钮
- 列表打开时会自动滚动到当前选中项
