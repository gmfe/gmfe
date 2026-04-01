# Affix

## 简介
固钉组件 - 使用 CSS `position: sticky` 实现元素在滚动时的固定定位效果。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import Affix from '@gmfe/react/lib/affix'

<Affix top={0}>
  <div>固定在顶部的内容</div>
</Affix>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 需要固钉的子元素 | `any` | - | 否 |
| top | 距离窗口顶部达到指定偏移量后触发固定 | `number` | - | 否 |
| bottom | 距离窗口底部达到指定偏移量后触发固定 | `number` | - | 否 |

## 示例

### 固定在顶部
```jsx
<Affix top={0}>
  <div>固定在顶部的内容</div>
</Affix>
```

### 固定在底部
```jsx
<Affix bottom={0}>
  <div>固定在底部的内容</div>
</Affix>
```

### 同时设置顶部和底部
```jsx
<Affix top={0} bottom={0}>
  <div>会被钉住在顶部和底部</div>
</Affix>
```

## 注意事项
- 底层使用 CSS `position: sticky` 实现，需要浏览器支持 sticky 定位
- 默认 `z-index` 为 950
- `top` 和 `bottom` 可以同时设置，也可以只设置其中一个
- `top` 和 `bottom` 的单位为像素（px），传入的是数字值
