// @ts-nocheck
/* eslint-disable */
import React, { useEffect, useRef } from 'react'
import { findDOMNode } from 'react-dom'
import { storiesOf } from '@storybook/react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { List, Flex } from '@gmfe/react'
import SortableJS, { Swap } from 'sortablejs'
import _ from 'lodash'

SortableJS.mount(new Swap())

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
      value: '2',
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
  setData(data) {
    console.log(data)
    this.data = data
  },
})

const Wrap = observer(({ data, onSortChange }) => {
  const refList = useRef(null)

  useEffect(() => {
    const map = {}

    const target = findDOMNode(refList.current).childNodes[0]
    const sortable = new SortableJS(target, {
      animation: 150,
      onUpdate: () => {
        const newIds = sortable.toArray()
        const newData = _.map(newIds.slice(1), (v) => map[v])
        onSortChange(newData)
      },
    })

    // 第一个忽略，不知道为啥
    _.each(sortable.toArray().slice(1), (v, i) => {
      map[v] = data[i]
    })

    return () => {
      sortable.destroy()
    }
  }, [data])

  return <List ref={refList} data={data} />
})

const Custom = () => {
  const refList1 = useRef(null)
  const refList2 = useRef(null)

  useEffect(() => {
    const target = findDOMNode(refList1.current)
    const sortable = new SortableJS(target, {
      swap: true,
      swapClass: 'gm-back-bg',
      animation: 150,
      group: 'group',
      onUpdate: () => {
        const newIds = sortable.toArray()
        console.log(newIds)
      },
    })

    const target2 = findDOMNode(refList2.current)
    const sortable2 = new SortableJS(target2, {
      swap: true,
      swapClass: 'gm-back-bg',
      animation: 150,
      group: 'group',
      onUpdate: () => {
        const newIds = sortable.toArray()
        console.log(newIds)
      },
    })
  }, [])

  return (
    <div>
      <Flex ref={refList1}>
        <div
          className='gm-padding-10 gm-border'
          style={{
            width: '100px',
            height: '100px',
          }}
        >
          1
        </div>
        <div
          className='gm-padding-10 gm-border'
          style={{
            width: '100px',
            height: '100px',
          }}
        >
          2
        </div>

        <div
          className='gm-padding-10 gm-border'
          style={{
            width: '100px',
            height: '100px',
          }}
        >
          3
        </div>
      </Flex>
      <div
        disabled
        className='disabled'
        style={{ width: '100%', margin: '10px', border: '1px solid black' }}
      />
      <Flex ref={refList2}>
        <div
          className='gm-padding-10 gm-border'
          style={{
            width: '100px',
            height: '100px',
          }}
        >
          4
        </div>
        <div
          className='gm-padding-10 gm-border'
          style={{
            width: '100px',
            height: '100px',
          }}
        >
          5
        </div>
      </Flex>
    </div>
  )
}

storiesOf('Sortable|JS', module)
  .add(
    'default',
    () => <Wrap data={store.data.slice()} onSortChange={(data) => store.setData(data)} />,
    {
      info: {
        text: `
复杂情况实例，比如让 List 具有 sortable:
- List 需能用上 ref，如不支持可通过 id 去识别。
- 在 useEffect 里 new SortableJS 使其具备 sortable。 useEffect 第二个参数监听 data 的变动。记得销毁 destroy 
- sortable.toArray 获得拖拽后的顺序，并和一开始的样子做比较获得排序后的 data
- toArray 需 slice(1)，具体原因未知
`,
      },
    }
  )
  .add('custom', () => <Custom />)
