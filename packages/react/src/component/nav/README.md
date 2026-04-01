# Nav

## 简介
导航菜单组件 - 支持三级导航结构的侧边栏导航，鼠标悬停显示二级、三级菜单的弹出浮层。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import Nav from '@gmfe/react/lib/nav'

<Nav
  logo={<img src='/logo.png' alt='logo' />}
  data={navData}
  selected={currentPath}
  onSelect={item => console.log(item)}
/>
```

## API

### Nav Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| logo | Logo 元素 | `ReactElement` | - | 否 |
| logoActive | Logo 区域是否激活 | `bool` | - | 否 |
| data | 三级菜单数据，结构为 `[{link, name, icon, sub: [{link, name, style, sub: [{link, name}]}]}]`，sub 没有的话就没有 popup | `array` | - | 是 |
| selected | 当前路由地址，会匹配到第三级 link | `string` | - | 是 |
| onSelect | 点击菜单回调，返回选中的第三级 item 数据 | `(item: object) => void` | - | 是 |
| showActive | 控制浮层的显示，传入对应一级菜单的 link 值 | `string` | - | 否 |
| other | 其他自定义内容元素（如应用中心入口），显示在底部 | `ReactElement` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### Nav.SingleItem Props
用于在 `other` 属性中渲染无二级菜单的一级菜单项。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 菜单项数据，结构为 `{link, name, icon}` | `object` | - | 是 |
| selected | 当前路由地址 | `string` | - | 是 |
| onSelect | 点击菜单回调，返回当前 data | `(item: object) => void` | - | 是 |

## 示例

### 基础用法
```jsx
const navData = [
  {
    link: '/merchandise',
    name: '商品',
    sub: [
      {
        name: '商品管理',
        link: '/merchandise/manage',
        sub: [
          { link: '/merchandise/manage/sale', name: '报价单管理' },
          { link: '/merchandise/manage/list', name: '商品库' }
        ]
      }
    ]
  },
  {
    link: '/supply_chain',
    name: '供应链',
    sub: [
      {
        name: '订单',
        link: '/supply_chain/order',
        sub: [
          { link: '/supply_chain/order/list', name: '订单列表' }
        ]
      }
    ]
  }
]

const application = { name: '应用中心', link: '/application_center' }

<Nav
  logo={<img src='/logo.png' style={{ maxHeight: '35px', maxWidth: '80px' }} />}
  data={navData}
  selected='/merchandise/manage/sale'
  onSelect={item => navigate(item.link)}
  other={
    <Nav.SingleItem
      data={application}
      selected={currentPath}
      onSelect={item => navigate(item.link)}
    />
  }
/>
```

## 注意事项
- data 为三级菜单结构，如果一级菜单没有 `sub` 字段则不会显示弹出浮层
- `selected` 传入当前路由地址，组件会自动匹配到第三级 link 并高亮显示
- 弹出浮层会自动适应屏幕底部边界，超出时会向上偏移
- 弹出浮层通过 Portal 渲染到 `gmNavPopupContainer` 容器中
- 使用 `Nav.SingleItem` 可在底部区域添加没有二级菜单的独立菜单项
