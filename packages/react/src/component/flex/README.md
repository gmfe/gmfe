# Flex

## 简介
弹性布局组件 - 对 CSS Flexbox 布局的简单封装，提供兼容性良好的布尔值属性来控制 flex 容器的各种行为。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import Flex from '@gmfe/react/lib/flex'

// 水平居中布局
<Flex justifyCenter alignCenter>
  <div>内容1</div>
  <div>内容2</div>
</Flex>

// 垂直布局
<Flex column>
  <div>上</div>
  <div>下</div>
</Flex>
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| flex | flex 值，传入数字时作为 flex 属性值，传入 true 时等同于 1 | `number \| bool` | - | 否 |
| auto | 设置 flex: auto | `bool` | - | 否 |
| none | 设置 flex: none | `bool` | - | 否 |
| width | 设置宽度（设置后自动添加 none 效果） | `string` | - | 否 |
| height | 设置高度（设置后自动添加 none 效果） | `string` | - | 否 |
| row | 水平排列（主轴为水平方向） | `bool` | - | 否 |
| column | 垂直排列（主轴为垂直方向） | `bool` | - | 否 |
| wrap | 允许换行 | `bool` | - | 否 |
| nowrap | 不允许换行 | `bool` | - | 否 |
| justifyStart | 主轴起始对齐 | `bool` | - | 否 |
| justifyEnd | 主轴末尾对齐 | `bool` | - | 否 |
| justifyCenter | 主轴居中对齐 | `bool` | - | 否 |
| justifyBetween | 主轴两端对齐，中间等距分布 | `bool` | - | 否 |
| justifyAround | 主轴周围等距分布 | `bool` | - | 否 |
| alignStart | 交叉轴起始对齐 | `bool` | - | 否 |
| alignEnd | 交叉轴末尾对齐 | `bool` | - | 否 |
| alignCenter | 交叉轴居中对齐 | `bool` | - | 否 |
| alignBaseline | 交叉轴基线对齐 | `bool` | - | 否 |
| alignStretch | 交叉轴拉伸对齐 | `bool` | - | 否 |
| alignContentStart | 多行交叉轴起始对齐 | `bool` | - | 否 |
| alignContentEnd | 多行交叉轴末尾对齐 | `bool` | - | 否 |
| alignContentCenter | 多行交叉轴居中对齐 | `bool` | - | 否 |
| alignContentBetween | 多行交叉轴两端对齐 | `bool` | - | 否 |
| alignContentAround | 多行交叉轴周围等距分布 | `bool` | - | 否 |
| alignContentStretch | 多行交叉轴拉伸对齐 | `bool` | - | 否 |
| children | 子元素 | `any` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法
```jsx
// 水平布局，两端对齐
<Flex row justifyBetween>
  <div>左侧</div>
  <div>右侧</div>
</Flex>

// 垂直居中
<Flex column alignCenter>
  <div>项目1</div>
  <div>项目2</div>
</Flex>

// 设置固定宽度
<Flex width='200px'>
  固定宽度内容
</Flex>

// flex 自适应填充
<Flex flex>自动填充</Flex>
```

## 注意事项
- Flex 布局语法参考 [Flex 布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- 设置 `width` 或 `height` 属性后，组件会自动添加 `none` 效果（即 `flex: none`）
- `flex` 属性传入 `true` 时等同于 `flex: 1`，传入数字时直接作为 flex 值
