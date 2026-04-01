# DropDown

## 简介
下拉菜单组件 - 点击触发弹出下拉列表，支持普通模式和分割按钮模式。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { DropDown, DropDownItem, DropDownItems } from '@gmfe/react/lib/drop_down'

<DropDown
  popup={
    <DropDownItems>
      <DropDownItem onClick={() => console.log('选项1')}>选项1</DropDownItem>
      <DropDownItem onClick={() => console.log('选项2')}>选项2</DropDownItem>
    </DropDownItems>
  }
>
  <Button>下拉菜单</Button>
</DropDown>
```

## API

### DropDown Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| popup | 弹出层内容 | `ReactElement` | - | 是 |
| split | 是否为分割按钮模式 | `bool` | `false` | 否 |
| right | 弹出层是否右对齐（非 split 模式有效） | `bool` | - | 否 |
| cartClassName | 分割按钮的触发按钮类名（split 模式有效） | `string` | - | 否 |
| children | 触发下拉菜单的元素 | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### DropDownItem Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| active | 是否激活状态 | `bool` | - | 否 |
| disabled | 是否禁用 | `bool` | - | 否 |
| onClick | 点击回调 | `() => void` | - | 是 |
| children | 菜单项内容 | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### DropDownItems Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 菜单项列表（DropDownItem 组件） | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法
```jsx
<DropDown
  popup={
    <DropDownItems>
      <DropDownItem onClick={() => console.log('选项1')}>选项1</DropDownItem>
      <DropDownItem onClick={() => console.log('选项2')}>选项2</DropDownItem>
    </DropDownItems>
  }
>
  <span>下拉菜单</span>
</DropDown>
```

### 分割按钮模式
```jsx
<DropDown
  split
  popup={
    <DropDownItems>
      <DropDownItem onClick={() => console.log('选项1')}>选项1</DropDownItem>
      <DropDownItem onClick={() => console.log('选项2')}>选项2</DropDownItem>
    </DropDownItems>
  }
>
  <Button>主要操作</Button>
</DropDown>
```

### 禁用菜单项
```jsx
<DropDown
  popup={
    <DropDownItems>
      <DropDownItem onClick={() => {}}>正常选项</DropDownItem>
      <DropDownItem disabled onClick={() => {}}>禁用选项</DropDownItem>
      <DropDownItem active onClick={() => {}}>激活选项</DropDownItem>
    </DropDownItems>
  }
>
  <Button>下拉菜单</Button>
</DropDown>
```

## 注意事项
- DropDown 底层使用 Popover 组件实现
- 普通模式下，点击弹出层内的内容会自动关闭弹出层
- 分割按钮模式下，触发按钮和下拉箭头是分开的
- DropDownItem 设置 `disabled` 后，点击不会触发 onClick 回调
