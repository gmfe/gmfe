import React from 'react'
import DropSelect from './drop_select'

export default { title: 'drop-select' }

export const Default = () => {
  return (
    <DropSelect
      show
      data={{
        list: [
          { id: '1', name: '名1' },
          { id: '2', name: '名2' },
        ],
        loading: false,
        columns: [
          { field: 'id', name: 'id' },
          { field: 'name', name: 'name' },
        ],
      }}
    />
  )
}
