import React from 'react'
import _ from 'lodash'
import { storiesOf } from '@storybook/react'
import { observable } from 'mobx'
import classNames from 'classnames'
import Sortable from './components/sortable'
import GroupSortable from './components/sortable_group'

const store = observable({
  data: [
    {
      value: 0,
      text: '大白菜',
    },
    {
      value: 1,
      text: '牛肉',
    },
    {
      value: 2,
      text: '鸡肉',
    },
    {
      value: 3,
      text: '鸭肉',
    },
    {
      value: 4,
      text: '大闸蟹',
    },
  ],
  disabled: true,
  setData(data: any) {
    this.data = data
  },
  groupData: [
    [
      {
        value: 0,
        text: '大白菜',
      },
      {
        value: 1,
        text: '牛肉',
      },
    ],
    [
      {
        value: 2,
        text: '鸡肉',
      },
    ],
    [
      {
        value: 3,
        text: '鸭肉',
      },
      {
        value: 4,
        text: '大闸蟹',
      },
    ],
  ],
})

// eslint-disable-next-line react/display-name
const Wrap = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className, ...rest }, ref) => (
    <div {...rest} ref={ref} className={classNames('gm-border gm-padding-10 gm-flex', className)} />
  )
)

storiesOf('Sortable|Sortable', module)
  .add('说明', () => <div />, {
    info: {
      text: `
说明：
- 很有必要看一遍 https://github.com/SortableJS/Sortable 的文档
- 请使用封装的排序组件，不直接结存 JS 用法，如果有，请沟通。

最佳实践：
- 提供唯一标识 value
- 排序单独UI，不要和太多业务逻辑耦合
- 排序期间 data 最好不要变。拖拽期间数据变了，这不是很尴尬！


原生用法局限(指 sortablejs 和 react-sortablejs)
- 通过子元素 data-id 来标识，不方便
- data-id 必须是字符串
- react-sortable 不支持 disabled。所以 copy 过来改了。
`,
    },
  })
  .add('default', () => <Sortable data={store.data} onChange={(data) => store.setData(data)} />)
  .add('disabled', () => (
    <Sortable
      disabled={store.disabled}
      data={store.data}
      onChange={(data) => store.setData(data)}
    />
  ))
  .add('renderItem', () => (
    <Sortable
      data={store.data}
      onChange={(data) => store.setData(data)}
      renderItem={(item) => <div className='gm-border gm-padding-10'>{item.text}</div>}
    />
  ))
  .add('限定高', () => (
    <Sortable
      data={store.data}
      onChange={(data) => store.setData(data)}
      renderItem={(item) => <div className='gm-border gm-padding-10'>{item.text}</div>}
      style={{
        height: '100px',
        overflow: 'auto',
      }}
    />
  ))
  .add('指定拖动单元', () => (
    <Sortable
      data={store.data}
      onChange={(data) => store.setData(data)}
      options={{
        handle: '.b-sortable-handle',
      }}
      renderItem={(item) => (
        <div className='gm-border gm-padding-10'>
          <span className='b-sortable-handle gm-cursor-grab'>move</span>
          &nbsp;&nbsp;
          {item.text}
        </div>
      )}
    />
  ))
  .add('tag', () => (
    <Sortable tag={Wrap} data={store.data} onChange={(data) => store.setData(data)} />
  ))

storiesOf('Sortable|GroupSortable', module).add('default', () => (
  <GroupSortable
    data={store.groupData.slice()}
    onChange={(newData) => {
      // console.log('onChange', newData)
      store.groupData = newData
    }}
    renderItem={(item) => (
      <div className='gm-border gm-margin-5 gm-padding-5'>
        {item.text} {item.value}
      </div>
    )}
    itemProps={{
      style: {
        backgroundColor: 'yellow',
        margin: '5px',
      },
    }}
    tag={Wrap}
  >
    {(items) => (
      <div>
        {_.map(items, (item, i) => (
          <div key={i}>
            {item}
            {i < items.length - 1 && <hr />}
          </div>
        ))}
      </div>
    )}
  </GroupSortable>
))
