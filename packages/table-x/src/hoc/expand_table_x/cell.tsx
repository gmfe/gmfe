import React from 'react'
import { Row } from 'react-table'
import { typedMemo } from '../../utils'
import ExpandTableXContext from './context'
import ExpandItem from './item'

function ExpandCell<Original extends object>({ row }: { row: Row<Original> }) {
  return (
    <ExpandTableXContext.Consumer>
      {({ expanded, onExpand }) => {
        const isExpanded = expanded[row.index]
        return (
          <ExpandItem
            active={isExpanded}
            onChange={() => {
              onExpand({ ...expanded, [row.index]: !isExpanded })
            }}
          />
        )
      }}
    </ExpandTableXContext.Consumer>
  )
}

export default typedMemo(ExpandCell)
