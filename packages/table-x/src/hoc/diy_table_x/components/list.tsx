import React, { MouseEvent } from 'react'
import { DiyTableXColumn } from '../types'
import SVGRemove from '../../../../svg/remove.svg'

interface ListProps<Original extends object> {
  columns: DiyTableXColumn<Original>[]
  onColumnsRemove(key: string): void
}

function List<Original extends object>({
  columns,
  onColumnsRemove,
}: ListProps<Original>) {
  const onRemove = (event: MouseEvent<SVGElement>, key: string): void => {
    event.stopPropagation()
    onColumnsRemove(key)
  }

  return (
    <ul className='gm-react-table-x-diy-modal-list-ul'>
      {columns.map((column) => {
        const { diyItemText, Header, key, diyEnable } = column
        const text = diyItemText ?? Header
        return (
          <li className='gm-react-table-x-diy-modal-list-li' key={key}>
            {text}
            {diyEnable && (
              <SVGRemove
                className='gm-cursor gm-react-table-x-diy-modal-list-li-remove'
                onClick={(event) => onRemove(event, key!)}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default List
