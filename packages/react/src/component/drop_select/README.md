# DropSelect

## 简介
下拉选择面板组件 - 带表格结构的下拉选择组件，支持多列展示、自定义渲染、键盘导航和操作按钮等功能。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import DropSelect from '@gmfe/react/lib/drop_select'

<DropSelect
  show={isVisible}
  data={{
    loading: false,
    list: [{ id: 1, name: '张三', age: 25 }, { id: 2, name: '李四', age: 30 }],
    columns: [
      { field: 'name', name: '姓名' },
      { field: 'age', name: '年龄' }
    ],
    actions: [{ text: '删除', onClick: (row) => handleDelete(row) }]
  }}
  onHide={() => setVisible(false)}
  onEnter={(index) => handleEnter(index)}
>
  <input type="text" placeholder="请输入..." />
</DropSelect>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| show | 是否显示下拉面板 | `bool` | - | 是 |
| data | 下拉面板数据 | `object` | - | 否 |
| onEnter | 键盘回车回调，参数为当前激活的列表索引 | `(index: number) => void` | `() => console.log(...)` | 否 |
| onHide | 隐藏下拉面板回调（点击外部区域或按 Esc 键时触发） | `() => void` | - | 否 |
| children | 触发元素（如 input） | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |

### data 对象结构

| 字段 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| loading | 是否加载中 | `bool` | `false` |
| list | 数据列表 | `array` | `[]` |
| columns | 列配置 | `array` | `[]` |
| actions | 操作按钮配置 | `array` | `[]` |

#### columns 数组项

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| field | 对应 list 中的字段名 | `string` | 否 |
| name | 列标题 | `string` | 否 |
| render | 自定义单元格渲染，参数为 `(value, rowData, rowIndex)` | `(value, rowData, rowIndex) => ReactNode` | 否 |

#### actions 数组项

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| text | 按钮文字 | `string` | 否 |
| onClick | 点击回调，参数为当前行数据 | `(rowData) => void` | 否 |
| getDisabled | 判断按钮是否禁用 | `(rowData, rowIndex) => bool` | 否 |
| className | 按钮自定义类名 | `string` | 否 |

## 示例

### 基础用法
```jsx
const [visible, setVisible] = useState(false)

<DropSelect
  show={visible}
  data={{
    list: [
      { id: 1, name: '张三', age: 25 },
      { id: 2, name: '李四', age: 30 }
    ],
    columns: [
      { field: 'name', name: '姓名' },
      { field: 'age', name: '年龄' }
    ]
  }}
  onHide={() => setVisible(false)}
  onEnter={(index) => {
    const item = list[index]
    // 处理回车选中
  }}
>
  <input type="text" placeholder="请输入..." />
</DropSelect>
```

### 带操作按钮
```jsx
<DropSelect
  show={visible}
  data={{
    list: dataList,
    columns: [
      { field: 'name', name: '姓名' },
      { field: 'age', name: '年龄' }
    ],
    actions: [
      {
        text: '查看',
        onClick: (rowData) => viewDetail(rowData)
      },
      {
        text: '删除',
        onClick: (rowData) => handleDelete(rowData),
        getDisabled: (rowData) => rowData.isDefault
      }
    ]
  }}
  onHide={() => setVisible(false)}
>
  <input type="text" />
</DropSelect>
```

### 加载状态
```jsx
<DropSelect
  show={true}
  data={{
    loading: true,
    list: [],
    columns: []
  }}
  onHide={() => {}}
>
  <input type="text" />
</DropSelect>
```

## 注意事项
- 点击下拉面板外部区域会自动隐藏面板并触发 `onHide`
- 按 Esc 键也会触发 `onHide`
- 支持键盘导航：上/下方向键切换激活项，回车键确认选择
- 当前列表项为空时，键盘导航无效
- 激活的列表项会自动滚动到可视区域（`scrollIntoViewIfNeeded`）
- `onEnter` 默认只会在控制台打印 index，建议传入自定义处理函数
