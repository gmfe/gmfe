# @gmfe/react

## 简介

`@gmfe/react` 是 gmfe 组件库的核心 UI 包，提供 70+ 个 React 组件，涵盖表单、布局、导航、反馈、数据展示等常用场景。是所有其他 gmfe 包的基础依赖。

## 安装

```bash
npm install @gmfe/react
```

## 快速使用

```jsx
import { Button, Dialog, Form, Input, Select, Table } from '@gmfe/react'

function App() {
  return (
    <Button type="primary" onClick={() => Dialog.alert('Hello!')}>
      点击
    </Button>
  )
}
```

## 示例

### 表单提交

```jsx
import { Form, FormItem, FormButton, Button } from '@gmfe/react'

function App() {
  return (
    <Form
      labelWidth="100px"
      onSubmit={(values) => console.log('提交数据', values)}
    >
      <FormItem label="名称" required>
        <input name="name" placeholder="请输入名称" />
      </FormItem>
      <FormItem label="数量">
        <input name="quantity" type="number" />
      </FormItem>
      <FormButton>
        <Button type="primary" htmlType="submit">提交</Button>
        <Button htmlType="reset">重置</Button>
      </FormButton>
    </Form>
  )
}
```

### 多栏表单布局

```jsx
import { Form, FormItem, FormButton, FormBlock, Button, Select } from '@gmfe/react'

function App() {
  return (
    <Form labelWidth="100px">
      <FormBlock col={2}>
        <FormItem label="名称" required>
          <input name="name" />
        </FormItem>
        <FormItem label="地区">
          <Select data={areaList} />
        </FormItem>
      </FormBlock>
      <FormButton>
        <Button type="primary" htmlType="submit">提交</Button>
      </FormButton>
    </Form>
  )
}
```

### 弹窗交互

```jsx
import { Button, Dialog, Drawer } from '@gmfe/react'

function App() {
  return (
    <div>
      <Button onClick={() => Dialog.alert('操作成功')}>提示</Button>

      <Button onClick={() => {
        Dialog.confirm({
          title: '确认删除',
          children: '删除后不可恢复，是否继续？',
          onOK: async () => {
            await deleteApi()
          }
        })
      }}>确认对话框</Button>

      <Button onClick={() => {
        Drawer.open({
          title: '详情',
          children: <div>抽屉内容</div>
        })
      }}>打开抽屉</Button>
    </div>
  )
}
```

### Sheet 底部弹出表格

```jsx
import { Sheet, SheetColumn, SheetSelect, SheetAction, Button } from '@gmfe/react'

function App() {
  const [data, setData] = useState(listData)
  const [selected, setSelected] = useState([])

  return (
    <Sheet list={data}>
      <SheetColumn field="id" name="ID" />
      <SheetColumn field="name" name="名称" />
      <SheetColumn field="name" name="描述">
        {(name, index, record) => `商品：${name}，编号：${record.id}`}
      </SheetColumn>
      <SheetSelect
        onSelect={(checked, index) => {
          const next = data.slice()
          next[index]._gm_select = checked
          setData(next)
        }}
      />
      <SheetAction>
        {(checkedList) => (
          <Button onClick={() => console.log('已选', checkedList)}>批量操作</Button>
        )}
      </SheetAction>
    </Sheet>
  )
}
```

### 组件列表

### 表单组件

| 组件 | 说明 |
|------|------|
| `Form` | 表单容器，支持校验、提交、重置 |
| `FormItem` | 表单项，配合 Form 使用 |
| `FormButton` | 表单按钮组 |
| `FormBlock` | 表单块 |
| `FormGroup` | 表单分组 |
| `FormPanel` | 表单面板 |
| `Input` | 文本输入框 |
| `InputNumber` | 数字输入框 |
| `InputNumberV2` | 数字输入框 V2 |
| `Select` | 下拉选择框 |
| `Option` | 选择框选项 |
| `Checkbox` | 复选框 |
| `CheckboxGroup` | 复选框组 |
| `Radio` | 单选框 |
| `RadioGroup` | 单选框组 |
| `Switch` | 开关 |
| `DatePicker` | 日期选择器 |
| `DateRangePicker` | 日期范围选择器 |
| `Calendar` | 日历 |
| `TimeSpan` | 时间段 |
| `TimeSpanPicker` | 时间段选择器 |
| `Cascader` | 级联选择器 |
| `CascaderSelect` | 级联选择（Select 形式） |
| `ColorPicker` | 颜色选择器 |
| `Uploader` | 文件上传器 |
| `ImgUploader` | 图片上传器 |
| `Validator` | 表单校验工具 |

### 布局组件

| 组件 | 说明 |
|------|------|
| `LayoutRoot` | 根布局容器 |
| `Flex` | 弹性布局 |
| `Col` | 栅格列 |
| `Row` | 栅格行 |
| `Divider` | 分割线 |
| `Collapse` | 折叠面板 |

### 导航组件

| 组件 | 说明 |
|------|------|
| `Nav` | 导航栏 |
| `Tabs` | 标签页 |
| `Steps` | 步骤条 |
| `Breadcrumb` | 面包屑（见 @gmfe/frame） |
| `Pagination` | 分页器 |
| `PaginationV2` | 分页器 V2 |
| `PaginationText` | 文本分页器 |
| `Dropper` | 下拉刷新 |

### 反馈组件

| 组件 | 说明 |
|------|------|
| `Dialog` | 对话框 |
| `Modal` | 模态框 |
| `RightSideModal` | 右侧模态框 |
| `CleanModal` | 简洁模态框 |
| `Drawer` | 抽屉 |
| `Tip` | 轻提示 |
| `ToolTip` | 文字提示 |
| `Popover` | 气泡卡片 |
| `Loading` | 加载中 |
| `LoadingFullScreen` | 全屏加载 |
| `LoadingChunk` | 区块加载 |
| `Mask` | 遮罩层 |
| `NProgress` | 顶部进度条 |
| `Progress` | 进度条 |
| `ProgressCircle` | 环形进度条 |

### 数据展示

| 组件 | 说明 |
|------|------|
| `Table` | 表格（见 @gmfe/table） |
| `List` | 列表 |
| `Tree` | 树形控件 |
| `TreeV2` | 树形控件 V2 |
| `Transfer` | 穿梭框 |
| `TransferGroup` | 分组穿梭框 |
| `TransferV2` | 穿梭框 V2 |
| `Carousel` | 轮播图 |
| `ImagePreview` | 图片预览 |
| `PicturePreview` | 图片预览 V2 |
| `LazyImg` | 图片懒加载 |
| `FlipNumber` | 翻牌数字 |
| `Price` | 价格展示 |
| `LevelList` | 层级列表 |
| `LevelSelect` | 层级选择 |
| `TableSelect` | 表格选择 |
| `Selection` | 选择组件 |
| `Sheet` | 底部弹出表格 |
| `SheetColumn` | Sheet 列 |
| `SheetAction` | Sheet 操作 |
| `SheetSelect` | Sheet 选择 |
| `SheetBatchAction` | Sheet 批量操作 |
| `Box` | 卡片容器 |
| `BoxForm` | 表单卡片 |
| `BoxTable` | 表格卡片 |
| `BoxPanel` | 面板卡片 |
| `Badge` | 标记 |
| `Tag` | 标签 |
| `EditableText` | 可编辑文本 |

### 操作组件

| 组件 | 说明 |
|------|------|
| `Button` | 按钮 |
| `DropDown` | 下拉菜单 |
| `DropDownItems` | 下拉菜单项组 |
| `DropDownItem` | 下拉菜单项 |
| `DropSelect` | 下拉选择 |
| `FilterSelect` | 筛选选择 |
| `MultipleFilterSelect` | 多选筛选 |
| `MoreSelect` | 多选组件 |
| `Affix` | 固定定位 |
| `FunctionSet` | 功能设置 |
| `IconDownUp` | 上下切换图标 |
| `PopupContentConfirm` | 弹窗确认内容 |
| `RecommendInput` | 推荐输入 |
| `Storage` | 本地存储 |

## 相关包

| 包名 | 说明 |
|------|------|
| `@gmfe/locales` | 国际化支持 |
| `@gmfe/table` | 基于 react-table-v6 的高级表格 |
| `@gmfe/table-x` | 基于 react-table v7 的高级表格 |
| `@gmfe/keyboard` | 表格键盘导航 |
| `@gmfe/frame` | 页面框架布局 |
| `@gmfe/business` | 业务组件 |
| `@gmfe/cropper` | 图片裁剪 |
| `@gmfe/sortable` | 拖拽排序 |
| `@gmfe/qiniu-image` | 七牛云图片处理 |
| `@gmfe/tour` | 引导式教程 |
| `@gmfe/react-deprecated` | 已废弃组件 |

## 注意事项

- 依赖 `@svgr/webpack ^4.3.2` 作为 peer dependency，确保 webpack 配置了 svgr loader。
- 组件支持 React >= 16.12.0。
- 国际化功能依赖 `@gmfe/locales`，组件内部已集成。
- 所有组件的详细 API 文档请查看各组件目录下的 README.md。
