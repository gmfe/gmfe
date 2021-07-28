import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Table from '../table/base'
import SortableJS from 'sortablejs'
import _ from 'lodash'

function sortableTable(Component) {
  const SortableTable = ({ id, data, onSortChange, keyField, ...rest }) => {
    id = id || 'id' + +new Date() + '' + String(Math.random()).slice(2)

    useEffect(() => {
      const target = document.querySelector(`.rt-tbody`)

      const sortable = new SortableJS(target, {
        animation: 150,
        onStart: () => {
          target.classList.add('gm-table-sortable-active')
        },
        onEnd: () => {
          target.classList.remove('gm-table-sortable-active')
        },
        onUpdate: () => {
          const newIds = sortable.toArray()
          const newData = _.sortBy(data.slice(), v =>
            newIds.indexOf(v[keyField])
          )
          onSortChange(newData)
        }
      })

      return () => {
        sortable.destroy()
      }
    }, [data])

    return <Component {...rest} id={id} data={data} keyField={keyField} />
  }

  SortableTable.propTypes = {
    ...Table.propTypes,

    keyField: PropTypes.string,
    onSortChange: PropTypes.func.isRequired
  }

  SortableTable.defaultProps = {
    keyField: 'value'
  }

  return SortableTable
}

export default sortableTable
