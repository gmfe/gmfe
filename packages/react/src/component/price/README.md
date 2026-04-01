# Price

## 简介
价格显示组件 - 带货币符号的价格格式化组件，支持千分符、精度控制、多币种和分单位

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import { Price } from '@gmfe/react'

<Price value={10839} />
```

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 价格数值（负数会自动显示负号） | `number` | - | 是 |
| precision | 保留几位小数 | `number` | `2` | 否 |
| useGrouping | 是否使用千分符 | `bool` | `true` | 否 |
| currencyScale | 货币符号的缩放大小（em 单位），大于 1 时按 1em 显示 | `number` | `0.85` | 否 |
| keepZero | 是否保留小数点后无效的零 | `bool` | `true` | 否 |
| isFenUnit | value 是否为分单位（会自动除以 100） | `bool` | `false` | 否 |
| feeType | 多币种类型标识 | `string` | `''` | 否 |

### 静态方法
| 方法 | 说明 |
|------|------|
| `Price.setCurrency(symbol)` | 设置货币符号 |
| `Price.getCurrency(type?)` | 获取货币符号 |
| `Price.setUnit(unit)` | 设置货币单位 |
| `Price.getUnit(type?)` | 获取货币单位 |
| `Price.setCurrencyList(list)` | 设置多币种列表，格式：`[{symbol, type, unit}]` |

## 示例

### 基础用法
```jsx
<Price value={10839} />       // ¥10,839.00
<Price value={-10} />         // -¥10.00
<Price value={10000000} />    // ¥10,000,000.00
```

### 分单位
```jsx
<Price isFenUnit value={1234} /> // ¥12.34
```

### 自定义货币符号缩放
```jsx
<Price value={40002288} currencyScale={0.8} />
```

### 多币种
```jsx
// 先设置币种列表
Price.setCurrencyList([
  { symbol: '￥', type: 'CNY', unit: '元' },
  { symbol: '$', type: 'USD', unit: 'dollar' }
])

// 使用
<Price value={100} feeType="USD" /> // $100.00
```

## 注意事项
- 货币符号通过 `Price.setCurrency()` 设置后会持久化到 localStorage
- 货币符号变化时会自动刷新所有 Price 组件
- `feeType` 和静态方法配合使用可实现多币种切换
