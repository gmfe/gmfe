import React, { FC } from 'react'
import { Button } from '@gmfe/react'
import { getLocale } from '@gmfe/locales'
import OperationCell from './cell'
import OperationIconTip from './icon_tip'
import SVGPen from '../../../svg/pen.svg'

interface OperationRowEditProps {
  isEditing: boolean
  onClick?(): void
  onSave?(): void
  onCancel?(): void
}

const OperationRowEdit: FC<OperationRowEditProps> = ({
  children,
  isEditing,
  onClick,
  onSave,
  onCancel,
}) => {
  const handleClick = (): void => {
    onClick && onClick()
  }

  const handleSave = (): void => {
    onSave && onSave()
  }

  const handleCancel = (): void => {
    onCancel && onCancel()
  }

  return isEditing ? (
    <OperationCell>
      <OperationIconTip tip={getLocale('编辑')}>
        <span className='gm-padding-5'>
          <SVGPen
            className='gm-inline-block gm-cursor gm-text-14 gm-text gm-text-hover-primary'
            onClick={handleClick}
          />
        </span>
      </OperationIconTip>
      {children}
    </OperationCell>
  ) : (
    <OperationCell>
      <Button type='link' onClick={handleSave}>
        {getLocale('保存')}
      </Button>
      <span className='gm-padding-lr-5'>|</span>
      <Button type='link' onClick={handleCancel}>
        {getLocale('取消')}
      </Button>
    </OperationCell>
  )
}

export default OperationRowEdit
