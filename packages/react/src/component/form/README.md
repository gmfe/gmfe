# Form

## 简介
表单组件 - 提供完整的表单布局能力，包含 Form、FormItem、FormButton、FormBlock、FormGroup、FormPanel 等子组件，支持单栏/多栏布局、表单验证、按钮位置控制等功能。

## 安装
已包含在 `@gmfe/react` 中，无需额外安装。

## 使用
```jsx
import {
  Form,
  FormItem,
  FormButton,
  FormBlock,
  FormGroup,
  FormPanel
} from '@gmfe/react'
```

## API

### Form Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onSubmit | 表单提交回调（已内置 event.preventDefault） | `func` | - | 否 |
| onSubmitValidated | 所有验证通过后调用 | `func` | - | 否 |
| inline | 行内模式，一般用不到，BoxForm 内部自动使用 | `bool` | - | 否 |
| disabledCol | 禁用列宽限制，让表单撑满页面 | `bool` | - | 否 |
| colWidth | 自定义列宽 | `string` | - | 否 |
| labelWidth | label 宽度 | `string` | - | 否 |
| hasButtonInGroup | 仅在 FormGroup 下使用，添加隐藏按钮响应 Enter | `bool` | - | 否 |
| btnPosition | 按钮位置 | `'center' \| 'left' \| 'right'` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### Form 方法（通过 ref 调用）
| 方法 | 说明 |
|------|------|
| apiDoValidate | 手动触发验证，返回 boolean |

### FormItem Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| col | 占用栏数 | `1 \| 2 \| 3` | `1` | 否 |
| disabledCol | 禁用列宽限制 | `bool` | - | 否 |
| label | 标签文本（请不要包含 `:`） | `string \| element` | - | 否 |
| toolTip | 提示信息 | `element` | - | 否 |
| toolTipLeft | 提示信息位置左移 | `bool` | - | 否 |
| required | 是否必填 | `bool` | - | 否 |
| unLabelTop | 去掉 label 的上边距 | `bool` | - | 否 |
| validate | 验证函数（配合 Validator 使用） | `func` | - | 否 |
| error | 手动设置错误状态 | `bool` | - | 否 |
| help | 手动设置帮助文本 | `string` | - | 否 |
| labelWidth | label 宽度（一般由 Form 传入） | `string` | - | 否 |
| colWidth | 列宽（一般由 Form 传入） | `string` | - | 否 |
| canValidate | 是否可验证（由 Form 内部控制） | `bool` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### FormBlock Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| col | 占用栏数 | `1 \| 2 \| 3` | `1` | 否 |
| disabledCol | 禁用列宽限制（Form 传入，不要手动设置） | `bool` | - | 否 |
| inline | 行内模式（Form 传入，不要手动设置） | `bool` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### FormButton Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| labelWidth | label 宽度（由 Form 传入） | `string` | - | 否 |
| btnPosition | 按钮位置 | `'center' \| 'left' \| 'right'` | - | 否 |

### FormGroup Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| formRefs | 所有 Form 的 ref 数组 | `array` | - | 是 |
| onSubmit | 提交回调 | `func` | - | 否 |
| onSubmitValidated | 验证通过后回调 | `func` | - | 否 |
| onCancel | 取消回调 | `func` | - | 否 |
| disabled | 是否禁用提交按钮 | `bool` | - | 否 |
| saveText | 保存按钮文案 | `string` | `'保存'` | 否 |
| actions | 额外操作按钮 | `element` | - | 否 |

### FormPanel Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 面板标题 | `string` | - | 否 |
| left | 标题左侧自定义元素 | `element` | - | 否 |
| right | 标题右侧自定义元素 | `element` | - | 否 |
| showBorder | 是否显示分割线 | `bool` | `true` | 否 |

### FormPanel.More Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 展开更多时显示的内容 | `any` | - | 否 |

## 示例

### 单栏表单
```jsx
<Form disabledCol labelWidth='100px' onSubmit={() => console.log('submit')}>
  <FormItem label='名字' required>
    <input
      type='text'
      value={name}
      onChange={e => setName(e.target.value)}
    />
  </FormItem>
  <FormItem label='地区'>
    <Select data={area} value={areaValue} onChange={setAreaValue} />
  </FormItem>
  <FormButton>
    <Button type='primary' htmlType='submit'>提交</Button>
  </FormButton>
</Form>
```

### 多栏表单
```jsx
<Form labelWidth='100px' onSubmit={() => console.log('submit')}>
  <FormBlock col={2}>
    <FormItem label='名字' required>
      <input type='text' value={name} onChange={e => setName(e.target.value)} />
    </FormItem>
    <FormItem label='地区'>
      <Select data={area} value={areaValue} onChange={setAreaValue} />
    </FormItem>
  </FormBlock>
  <FormButton>
    <Button type='primary' htmlType='submit'>提交</Button>
  </FormButton>
</Form>
```

### 表单验证
```jsx
import { Validator } from '@gmfe/react'

<FormItem
  label='描述'
  required
  validate={Validator.create([], description)}
>
  <textarea value={desc} onChange={e => setDesc(e.target.value)} />
</FormItem>
```

### 多表单聚合
```jsx
const form1 = useRef(null)
const form2 = useRef(null)

<FormGroup
  formRefs={[form1, form2]}
  onCancel={() => console.log('Cancel')}
  onSubmitValidated={() => console.log('onSubmitValidated')}
>
  <Form ref={form1} labelWidth='100px' hasButtonInGroup>
    <FormItem label='名字' required>
      <input type='text' value={name} onChange={e => setName(e.target.value)} />
    </FormItem>
  </Form>
  <Form ref={form2} labelWidth='100px' hasButtonInGroup>
    <FormItem label='描述' required validate={Validator.create([], desc)}>
      <textarea value={desc} onChange={e => setDesc(e.target.value)} />
    </FormItem>
  </Form>
</FormGroup>
```

### FormPanel 面板
```jsx
<FormPanel title='店铺设置' left={<Button onClick={handleSearch}>搜索</Button>}>
  <Form colWidth='400px' ref={formRef} labelWidth='160px' hasButtonInGroup>
    <FormItem label='名字' required>
      <input type='text' value={name} onChange={e => setName(e.target.value)} />
    </FormItem>
    <FormPanel.More>
      <FormBlock col={2}>
        <FormItem label='邀请码' required>
          <input type='text' value={code} onChange={e => setCode(e.target.value)} />
        </FormItem>
      </FormBlock>
    </FormPanel.More>
  </Form>
</FormPanel>
```

## 注意事项
- Form 的 `onSubmit` 已内置 `event.preventDefault()`，无需手动调用
- 单栏表单需要设置 `disabledCol` 属性，否则 FormItem 会被限制在默认宽度内
- `FormItem` 会自动识别常用的表单元素（input、textarea、select、InputNumber、InputNumberV2）并添加 `form-control` 类名
- `FormGroup` 中 `onSubmit` 和 `onSubmitValidated` 只需提供一个，不要同时使用
- `label` 属性不要包含冒号（`:` 或 `：`），组件会自动添加
- 默认列宽为 320px，FormPanel 中默认为 400px，可通过 `colWidth` 自定义
- `FormGroup` 会在内容超出屏幕高度时自动吸底按钮区域
