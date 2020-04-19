import React from 'react'
import _ from 'lodash'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { pinYinFilter } from '@gm-common/tool'
import TreeV2 from './tree_v2'

const store = observable({
  oneData: [
    {
      value: 1,
      text: '蔬菜',
    },
    {
      value: 2,
      text: '冻品',
    },
  ],
  data: [
    {
      value: 1,
      text: '蔬菜',
      children: [
        {
          value: 11,
          text: '叶菜',
          children: [
            {
              value: 111,
              text: '皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜皇帝菜',
            },
            {
              value: 112,
              text: '金不换',
            },
          ],
        },
        {
          value: 12,
          text: '甘蓝',
          children: [
            {
              value: 121,
              text: '甘蓝1',
            },
            {
              value: 122,
              text: '甘蓝2',
            },
          ],
        },
      ],
    },
    {
      value: 2,
      text: '冻品',
      children: [
        {
          value: 21,
          text: '冻猪肉',
          children: [
            {
              value: 211,
              text: '五花肉',
            },
            {
              value: 212,
              text: '猪脚',
            },
          ],
        },
      ],
    },
  ],
  selectedValues: [],
  setSelectedValues(values: any) {
    this.selectedValues = values
  },
})

const Wrap = observer(() => {
  return (
    <div style={{ height: '500px', width: '300px' }}>
      <TreeV2
        list={json.data}
        selectedValues={store.selectedValues.slice()}
        onSelectValues={(values) => store.setSelectedValues(values)}
        onActiveValues={(data) => console.log(data)}
        title='lalala '
      />
    </div>
  )
})

const FlatWrap = observer(() => {
  return (
    <div style={{ height: '500px', width: '300px' }}>
      <TreeV2
        list={flatData}
        selectedValues={store.selectedValues.slice()}
        onSelectValues={(values) => store.setSelectedValues(values)}
        onActiveValues={(data) => console.log(data)}
      />
    </div>
  )
})

const FindFilterWrap = observer(() => {
  const handleFind = (data: any, searchText: any): any => {
    const findList: any = pinYinFilter(data, searchText, (v: any) => v.text)
    let res = findList
    _.forEach(data, (item) => {
      if (item.children && item.children.length) {
        res = _.concat(res, handleFind(item.children, searchText))
      }
    })
    return res
  }

  return (
    <div style={{ height: '500px', width: '300px' }}>
      <TreeV2
        list={json.data}
        selectedValues={store.selectedValues.slice()}
        onSelectValues={(values) => store.setSelectedValues(values)}
        onActiveValues={(data) => console.log(data)}
        title='lalala'
        withFindFilter={handleFind}
        withFilter={false}
      />
    </div>
  )
})

const TitleWrap = observer(() => {
  return (
    <div style={{ height: '500px', width: '300px' }}>
      <TreeV2
        title='标题拉'
        list={flatData}
        selectedValues={store.selectedValues.slice()}
        onSelectValues={(values) => store.setSelectedValues(values)}
        onActiveValues={(data) => console.log(data)}
      />
    </div>
  )
})

const RenderItemWrap = observer(() => {
  return (
    <div style={{ height: '500px', display: 'flex' }}>
      <TreeV2
        style={{ width: '300px', marginRight: '30px' }}
        list={json.data}
        selectedValues={store.selectedValues.slice()}
        onSelectValues={(values) => store.setSelectedValues(values)}
        onActiveValues={(data) => console.log(data)}
        title='叶子节点 renderLeafItem'
        renderLeafItem={(data) => (
          <div>
            <span
              style={{
                backgroundColor: '#56a3f2',
                color: 'white',
                padding: '1px',
                borderRadius: '2px',
              }}
            >
              上架
            </span>
            {data.text}
          </div>
        )}
      />

      <TreeV2
        style={{ width: '300px' }}
        list={json.data}
        selectedValues={store.selectedValues.slice()}
        onSelectValues={(values) => store.setSelectedValues(values)}
        onActiveValues={(data) => console.log(data)}
        title='非叶子节点 renderGroupfItem'
        renderGroupItem={(data) => (
          <div>
            <img
              src='https://img.guanmai.cn/product_pic/cdd0870bc403069b.jpeg'
              style={{ width: '30px', height: '30px' }}
              alt=''
            />
            {`${data.text}`}
          </div>
        )}
      />
    </div>
  )
})

const AdvanceFilterWrap = observer(() => {
  return (
    <div style={{ height: '500px', width: '300px' }}>
      <TreeV2
        list={json.data}
        selectedValues={store.selectedValues.slice()}
        onSelectValues={(values) => store.setSelectedValues(values)}
        onActiveValues={(data) => console.log(data)}
        title='lalala'
        withFilter={(list, query) => {
          let result = list

          let label: any
          let search = query
          if (query.startsWith('label:')) {
            const arr = query.split(' ')
            if (arr[0]) {
              label = arr[0].slice('label:'.length)
              search = arr[1]
            }
          }

          console.log(label, search)

          if (label || search) {
            result = TreeV2.filterGroupList(result, (v) => {
              let flag = true
              if (label && v.label !== label) {
                flag = false
              }
              if (search && !v.text.includes(search)) {
                flag = false
              }

              console.log(flag)

              return flag
            })
          }
          return result
        }}
      />
    </div>
  )
})

export const Default = () => (
  <div>
    <Wrap />
  </div>
)

export const title = () => (
  <div>
    <TitleWrap />
  </div>
)

export const flat = () => (
  <div>
    <FlatWrap />
  </div>
)

export const findFilter = () => (
  <div>
    <FindFilterWrap />
  </div>
)

export const renderItem = () => (
  <div>
    <RenderItemWrap />
  </div>
)

export const advanceFilter = () => (
  <div>
    <AdvanceFilterWrap />
  </div>
)

export const selectedValues2SelectedList = () => {
  return (
    <div>
      <Wrap />
      <button
        onClick={() => {
          console.log(
            TreeV2.selectedValues2SelectedList(json.data, store.selectedValues.slice())
          )
        }}
      >
        selectedValues2SelectedList
      </button>
    </div>
  )
}

export default {
  title: 'TreeV2',
}

const flatData = [
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
]

const json = {
  code: 0,
  msg: 'ok',
  data: [
    {
      value: 'A33792',
      children: [
        {
          value: 'B119099',
          children: [
            { value: 'C4125709', text: '腿肉（冷鲜）', label: 'A' },
            { value: 'C4125717', text: '肉片（冷鲜）', label: 'B' },
            { value: 'C4125676', text: '带皮五花肉（冷鲜）', label: 'C' },
            { value: 'C4125698', text: '去皮五花肉（冷鲜）', label: 'D' },
            { value: 'C4125706', text: '瘦肉（冷鲜）', label: 'E' },
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
            { value: 'C1292441', text: '中排骨', label: 'A' },
            { value: 'C3125818', text: '保鲜筒子骨', label: 'B' },
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
    {
      value: 'A111',
      text: '水果类',
      children: [
        {
          value: 'C111',
          text: '雪梨',
        },
        {
          value: 'C222',
          text: '葡萄',
        },
        {
          value: 'C333',
          text: '西瓜',
        },
      ],
    },
  ],
}
