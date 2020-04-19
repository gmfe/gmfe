import React, { useMemo, useRef } from 'react'
import _ from 'lodash'
import { GroupSortableProps, SortableDataOptions } from './types'
import Sortable from './sortable'

const GroupSortable = <T,>({
  data,
  onChange,
  renderItem,
  itemProps,
  tag,
  options,
  children,
}: GroupSortableProps<T>) => {
  /**
   * 两个列表之间的拖动，中间变量
   */
  const dataRef = useRef<SortableDataOptions<T>[][]>([])
  const flatData = useMemo(() => _.flatten(data), [data])
  const items = data.map((subData, index) => {
    const handleChange = (newSubData: SortableDataOptions<T>[]): void => {
      // 变化的才会触发 change，
      // 单个列表内拖动只一次 change，此时 newSubData 长度和原先一样
      // 如果列表之间拖动，当且仅当两次 change，此时 newSubData 长度和原先不一样
      if (newSubData.length === data[index].length) {
        const newData = data.slice()
        newData[index] = newSubData
        onChange(newData)
      } else {
        // 初次进入，会先修改被拖出的数组
        if (dataRef.current.length === 0) {
          // 第一次会先将 dataRef 填充，并将被拖出的那一项修改为 newSubData
          dataRef.current = data.slice()
          dataRef.current[index] = newSubData
        } else {
          // 第二次会拿到 dataRef，并将被拖入的那一项修改为 newSubData
          dataRef.current[index] = newSubData
          // 避免引用 slice
          const newData = dataRef.current.slice()
          // 还原
          dataRef.current = []
          onChange(newData)
        }
      }
    }

    return (
      <Sortable
        key={_.uniqueId()}
        data={flatData}
        groupValues={subData.map((val) => val.value)}
        onChange={handleChange}
        renderItem={renderItem}
        itemProps={itemProps}
        tag={tag}
        options={{ group: 'group', ...options }}
      />
    )
  })
  return children(items)
}

export default GroupSortable
