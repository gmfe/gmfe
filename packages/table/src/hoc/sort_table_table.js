import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Table from '../table/base'
import SortableJS from 'sortablejs'

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
        onEnd: ({ newIndex, oldIndex }) => {
          target.classList.remove('gm-table-sortable-active')
          // 删除原本位置的数据
          const deleteData = data.splice(oldIndex, 1)
          // 将删除的数据添加到新的位置
          data.splice(newIndex, 0, deleteData[0])
          onSortChange(data)
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
