import React, { HTMLAttributes, CSSProperties, FC } from 'react'
import classNames from 'classnames'
import SVGRemove from '../../../svg/remove.svg'
import { Button, ButtonType } from '../button'
import { getLocale } from '@gmfe/locales'

type PopupContentConfirmType = 'save' | 'delete'

type ButtonMap = {
  [key in PopupContentConfirmType]: {
    type: ButtonType
    text: string
    onClick(): void
  }
}

export interface PopupContentConfirmProps extends HTMLAttributes<HTMLDivElement> {
  type: PopupContentConfirmType
  title?: string
  onCancel(): void
  onDelete?(): void
  onSave?(): void
  className?: string
  style?: CSSProperties
}

const PopupContentConfirm: FC<PopupContentConfirmProps> = ({
  title,
  type = 'save',
  onCancel,
  onDelete,
  onSave,
  className,
  children,
  ...rest
}) => {
  const buttonMap: ButtonMap = {
    save: {
      text: getLocale('保存'),
      type: 'primary',
      onClick() {
        onSave && onSave()
      },
    },
    delete: {
      text: getLocale('删除'),
      type: 'danger',
      onClick() {
        onDelete && onDelete()
      },
    },
  }

  return (
    <div {...rest} className={classNames('gm-popup-content-confirm', className)}>
      <div className='gm-popup-content-confirm-title-wrap'>
        <div className='gm-popup-content-confirm-title'>{title}</div>
        <div className='gm-popup-content-confirm-close' onClick={onCancel}>
          <SVGRemove />
        </div>
      </div>
      <div className='gm-popup-content-confirm-content'>
        {children}
        <div className='gm-popup-content-confirm-button'>
          <Button className='gm-margin-right-5' onClick={onCancel}>
            {getLocale('取消')}
          </Button>
          <Button type={buttonMap[type].type} onClick={() => buttonMap[type].onClick}>
            {buttonMap[type].text}
          </Button>
        </div>
      </div>
    </div>
  )
}
export default PopupContentConfirm
