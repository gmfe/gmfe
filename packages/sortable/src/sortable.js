import React from 'react'
import PropTypes from 'prop-types'
import SortableBase from './base'
import _ from 'lodash'
import classNames from 'classnames'
import { devWarnForHook, warn } from 'gm-util'

const Sortable = ({
  data,
  onChange,
  groupValues,
  renderItem,
  tag,
  options,
  ...rest
}) => {
  devWarnForHook(() => {
    if (groupValues && !options.group) {
      warn('groupValues need options.group')
    }
  })

  let filterData = data

  if (groupValues) {
    filterData = _.filter(data, v => groupValues.includes(v.value))
  }

  const handleChange = order => {
    order = _.map(order, v => JSON.parse(v))

    // 打平
    const map = {}
    _.each(data, v => {
      map[v.value] = v
    })

    const newData = _.map(order, v => map[v])
    onChange(newData)
  }

  const items = _.map(filterData, (v, index) => (
    <div
      key={v.value}
      data-id={JSON.stringify(v.value)}
      className={classNames({
        'gm-cursor-grab': !options.handle
      })}
    >
      {renderItem(v, index)}
    </div>
  ))

  return (
    <SortableBase
      {...rest}
      tag={tag}
      options={{
        animation: 150,
        ...options
      }}
      onChange={handleChange}
    >
      {items}
    </SortableBase>
  )
}

Sortable.propTypes = {
  /** [{value, text, ...}, {value, text, ...}] */
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  // options.group 有值的时候要传。此时的 data 是 group 集合数据，groupValues 是当前组件的数据
  groupValues: PropTypes.array,
  renderItem: PropTypes.func,
  /** 支持 ref */
  tag: PropTypes.node,
  options: PropTypes.object
}

Sortable.defaultProps = {
  renderItem: item => item.text,
  options: {}
}

export default Sortable
