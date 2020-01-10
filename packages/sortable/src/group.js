import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Sortable from './sortable'

const Group = ({ data, onChange, renderItem, tag, options, children }) => {
  const refKeys = useRef([])

  const Coms = _.map(data, (subData, i) => {
    const handleChangeKey = newSubKey => {
      if (i === 0) {
        refKeys.current = []
      }

      refKeys.current.push(newSubKey)

      if (i === data.length - 1) {
        // 打平，然后以 key 做个 map
        const map = {}
        _.each(_.flatten(data), item => {
          map[item.value] = item
        })

        const newData = []
        _.each(refKeys.current, sub => {
          newData.push(_.map(sub, k => map[k]))
        })

        onChange(newData)
      }
    }

    return (
      <Sortable
        data={subData}
        onChangeKey={handleChangeKey}
        renderItem={renderItem}
        tag={tag}
        options={{
          group: 'group',
          ...options
        }}
      />
    )
  })

  return children(Coms)
}

Group.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Group
