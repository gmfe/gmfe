import React from 'react'
import { observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
import _ from 'lodash'
import TransferV2 from './transfer_v2'
import { TreeV2DataOptions } from '../tree_v2'

function inherit(list: TreeV2DataOptions<string>[], parent?: any) {
  return list.map((item) => {
    const copy = Object.assign({ parent: _.omit(parent, 'children') }, item)
    if (copy.children) {
      copy.children = inherit(copy.children, copy)
    }
    return copy
  })
}

const store = observable({
  treeData: [
    {
      value: 'A33792',
      children: [
        {
          value: 'B119099',
          children: [
            { value: 'C4125709', text: '腿肉（冷鲜）' },
            { value: 'C4125717', text: '肉片（冷鲜）' },
            { value: 'C4125676', text: '带皮五花肉（冷鲜）' },
            { value: 'C4125698', text: '去皮五花肉（冷鲜）' },
            { value: 'C4125706', text: '瘦肉（冷鲜）' },
          ],
          text: '冷鲜肉',
        },
      ],
      text: '冷鲜肉类',
    },
    {
      value: 'A6982',
      children: [
        {
          value: 'B34032',
          children: [
            { value: 'C1292441', text: '中排骨' },
            { value: 'C3125818', text: '保鲜筒子骨' },
            { value: 'C1292444', text: '排骨 不砍' },
            { value: 'C1292448', text: '棒骨（带肉）' },
            { value: 'C1292443', text: '仔排' },
            { value: 'C1292449', text: '棒骨（不带扇骨）' },
            { value: 'C1292451', text: '肉脊骨（20%肉）' },
            { value: 'C1292445', text: '排骨 砍块' },
            { value: 'C1292455', text: '猪脆骨 ' },
            { value: 'C1292456', text: '猪腔骨 ' },
            { value: 'C1292454', text: '猪肋骨（二级）' },
            { value: 'C1292453', text: '猪头骨(7斤/只）' },
            { value: 'C1292446', text: '猪前排（去颈/1.25kg/块）' },
            { value: 'C1292447', text: '棒骨  （砍断）' },
            { value: 'C1292442', text: '排骨块（老排/约3-5厘米）' },
            { value: 'C1292452', text: '扇骨（剁块）' },
            { value: 'C1292450', text: '前腿骨头（带肉）' },
          ],
          text: '猪排骨类',
        },
        {
          value: 'B34021',
          children: [
            { value: 'C1292514', text: '土鸡  （鲜 2斤/只 去内脏）' },
            { value: 'C1354435', text: '老鸡' },
            { value: 'C1634180', text: '黄油鸡' },
            { value: 'C1292516', text: '叫鸡  （鲜 3斤/只 去内脏）' },
            { value: 'C1292509', text: '老母鸡（鲜 3斤/只 去内脏）' },
            { value: 'C1634561', text: '活  乌鸡' },
            { value: 'C1620471', text: '蛋鸡' },
            { value: 'C1292518', text: '草鸡  （鲜 3斤/只 去内脏）' },
            { value: 'C1292513', text: '黑脚鸡  （鲜 3斤/只去内脏）' },
            { value: 'C1880029', text: '正宗土鸡' },
            { value: 'C1292507', text: '乌鸡 （鲜 2斤/只 去内脏）' },
            { value: 'C1292512', text: '矮脚鸡（鲜 2斤/只 去内脏）' },
            { value: 'C1292515', text: '肉鸡  （鲜 3斤/只 去内脏）' },
            { value: 'C1292511', text: '清远鸡 （鲜 2斤/只 去内脏）' },
            { value: 'C1292510', text: '黑毛鸡 （鲜 2斤/只 去内脏）' },
            { value: 'C1354096', text: '仔鸡' },
            { value: 'C1292517', text: '老公鸡  （鲜 3斤/只 去内脏）' },
            { value: 'C1292505', text: '三黄鸡 （鲜 2斤/只 去内脏）' },
          ],
          text: '整鸡类',
        },
      ],
      text: '肉禽类',
    },
  ],
  flatData: [
    { value: 'C1292441', text: '中排骨' },
    { value: 'C3125818', text: '保鲜筒子骨' },
    { value: 'C1292444', text: '排骨 不砍' },
    { value: 'C1292448', text: '棒骨（带肉）' },
    { value: 'C1292443', text: '仔排' },
    { value: 'C1292449', text: '棒骨（不带扇骨）' },
    { value: 'C1292451', text: '肉脊骨（20%肉）' },
    { value: 'C1292445', text: '排骨 砍块' },
    { value: 'C1292455', text: '猪脆骨 ' },
    { value: 'C1292456', text: '猪腔骨 ' },
    { value: 'C1292454', text: '猪肋骨（二级）' },
    { value: 'C1292453', text: '猪头骨(7斤/只）' },
    { value: 'C1292446', text: '猪前排（去颈/1.25kg/块）' },
    { value: 'C1292447', text: '棒骨  （砍断）' },
    { value: 'C1292442', text: '排骨块（老排/约3-5厘米）' },
    { value: 'C1292452', text: '扇骨（剁块）' },
    { value: 'C1292450', text: '前腿骨头（带肉）' },
  ],
  selected: ['C1292452'],
  onSelected(selected: string[]) {
    this.selected = selected
  },
  parentInfo: [] as string[],
  doShowParentInfo(select: string[]) {
    this.parentInfo = select
  },
})

const Wrap = observer(() => {
  return (
    <div>
      <TransferV2
        list={toJS(store.flatData)}
        selectedValues={store.selected}
        onSelectValues={(selected) => store.onSelected(selected)}
        rightTree
      />
    </div>
  )
})
const TreeWrap = observer(() => {
  return (
    <div>
      <TransferV2
        list={toJS(store.treeData)}
        selectedValues={store.selected}
        onSelectValues={(selected) => store.onSelected(selected)}
      />
    </div>
  )
})
const TreeWrap2 = observer(() => {
  return (
    <div>
      <TransferV2
        list={toJS(store.treeData)}
        selectedValues={store.selected}
        onSelectValues={(selected) => store.onSelected(selected)}
        rightTree
      />
    </div>
  )
})
const TreePropsWrap = observer(() => {
  return (
    <div>
      <TransferV2
        list={inherit(store.treeData)}
        selectedValues={store.selected}
        onSelectValues={(selected) => store.onSelected(selected)}
        leftTitle='修改左边的标题'
        leftRenderGroupItem={(data) => (
          <div>
            <img
              src='https://img.guanmai.cn/product_pic/cdd0870bc403069b.jpeg'
              style={{ width: '30px', height: '30px' }}
              alt=''
            />
            {`${data.text}`}
          </div>
        )}
        rightStyle={{ width: '500px', height: '500px' }}
        rightTitle='修改左边的标题'
        rightRenderLeafItem={(data: any) => (
          <div>
            {data.parent.parent.text} -- {data.parent.text} -- {data.text}
          </div>
        )}
      />
    </div>
  )
})

export const Default = () => (
  <div>
    <Wrap />
  </div>
)
export const TreeData = () => (
  <div style={{ display: 'flex' }}>
    <div style={{ marginRight: '30px' }}>
      <p>右边非树结构</p>
      <TreeWrap />
    </div>
    <div>
      <p>右边树结构</p>
      <TreeWrap2 />
    </div>
  </div>
)
export const TreeProps = () => (
  <div>
    <TreePropsWrap />
  </div>
)

export default {
  title: 'TransferV2',
}
