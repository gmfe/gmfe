import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Sortable from './sortable'

const GroupSortable = ({
  data,
  onChange,
  renderItem,
  tag,
  options,
  children
}) => {
  const refData = useRef([])

  const flatData = _.flatten(data)
  const items = _.map(data, (subData, i) => {
    const handleSubChange = newSubData => {
      // 变化的才会触发 change，
      // 单个列表内拖动只一次 change，此时 newSubData 长度和原先一样
      // 如果列表之间拖动，仅有两次 change，此时 newSubData 长度和原先不一样
      if (newSubData.length === data[i].length) {
        const newData = data.slice()
        newData[i] = newSubData
        onChange(newData)
      } else {
        // 这种情况下，要做点特别的东西
        if (refData.current.length === 0) {
          // 第一次
          refData.current = data.slice()
          refData.current[i] = newSubData
        } else {
          // 第二次
          refData.current[i] = newSubData
          // 避免引用 slice
          const newData = refData.current.slice()
          // 还原
          refData.current = []

          onChange(newData)
        }
      }
    }

    return (
      <Sortable
        data={flatData}
        groupValues={_.map(subData, v => v.value)}
        onChange={handleSubChange}
        renderItem={renderItem}
        tag={tag}
        options={{
          group: 'group',
          ...options
        }}
      />
    )
  })

  return children(items)
}

GroupSortable.propTypes = {
  ...Sortable.propTypes,
  /** 和 Sortable 不同的是，data 是一个二维数组 */
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  onChange: PropTypes.func.isRequired
}

export default GroupSortable
