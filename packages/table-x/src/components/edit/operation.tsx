import React, { FC } from 'react'
import { Popover } from '@gmfe/react'
import classNames from 'classnames'
import { OperationCell } from '../operation'
import SVGPlusSquare from '../../../svg/plus-square.svg'
import SVGMinusSquare from '../../../svg/minus-square.svg'

interface EditOperationProps {
  onAddRow?(): void
  onDeleteRow?(): void
}

const EditOperation: FC<EditOperationProps> = ({ onAddRow, onDeleteRow }) => {
  return (
    <OperationCell>
      <Popover
        showArrow
        type='hover'
        popup={<div className='gm-padding-5'>添加</div>}
        disabled={!onAddRow}
      >
        <span
          onClick={onAddRow}
          className={classNames('gm-table-x-edit-action-add', {
            disabled: !onAddRow,
          })}
        >
          <SVGPlusSquare />
        </span>
      </Popover>
      <Popover
        showArrow
        type='hover'
        popup={<div className='gm-padding-5'>删除</div>}
        disabled={!onDeleteRow}
      >
        <span
          onClick={onDeleteRow}
          className={classNames('gm-table-x-edit-action-delete', {
            disabled: !onDeleteRow,
          })}
        >
          <SVGMinusSquare />
        </span>
      </Popover>
    </OperationCell>
  )
}

export default EditOperation
