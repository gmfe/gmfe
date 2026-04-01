# Tabs

## 简介
选项卡组件 - 支持受控和非受控两种模式，可通过 `lazy` 属性开启懒加载渲染。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import Tabs from '@gmfe/react/lib/tabs'

// 非受控模式
<Tabs tabs={['选项1', '选项2', '选项3']} defaultActive={0}>
  <div>内容1</div>
  <div>内容2</div>
  <div>内容3</div>
</Tabs>

// 受控模式
<Tabs
  tabs={['选项1', '选项2', '选项3']}
  active={activeIndex}
  onChange={index => setActiveIndex(index)}
>
  <div>内容1</div>
  <div>内容2</div>
  <div>内容3</div>
</Tabs>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tabs | 选项卡标题数组 | `string[]` | - | 是 |
| active | 当前激活的选项卡索引（受控模式） | `number` | - | 否 |
| defaultActive | 默认激活的选项卡索引（非受控模式） | `number` | `0` | 否 |
| lazy | 是否懒加载，开启后只渲染当前激活的选项卡内容 | `bool` | `false` | 否 |
| onChange | 选项卡切换回调，返回当前选中的索引 | `(index: number) => void` | - | 否 |
| children | 选项卡内容，长度必须与 tabs 数组一致 | `ReactNode[]` | - | 否 |

## 示例

### 受控模式
```jsx
const [active, setActive] = useState(0)
const tabs = ['第一个', '第二个', '第三个']

<Tabs
  tabs={tabs}
  active={active}
  onChange={index => setActive(index)}
>
  <div>第一个选项卡内容</div>
  <div>第二个选项卡内容</div>
  <div>第三个选项卡内容</div>
</Tabs>
```

### 非受控模式
```jsx
<Tabs tabs={['选项1', '选项2', '选项3']} defaultActive={2}>
  <div>内容1</div>
  <div>内容2</div>
  <div>内容3</div>
</Tabs>
```

### 懒加载模式
```jsx
<Tabs tabs={['选项1', '选项2', '选项3']} lazy>
  <div>内容1</div>
  <div>内容2</div>
  <div>内容3</div>
</Tabs>
```

## 注意事项
- `active` 和 `defaultActive` 不能同时使用，否则会输出控制台警告
- 使用 `active`（受控模式）时，必须同时传入 `onChange`，否则会输出控制台警告
- `children` 的长度必须与 `tabs` 数组长度一致，否则会报错
- 非懒加载模式下，所有选项卡内容都会被渲染（通过 `hidden` 类名控制显示/隐藏）
- 懒加载模式下，只有当前激活的选项卡内容会被渲染，切换时会销毁之前的内容
