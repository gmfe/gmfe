import React, { FC } from 'react'
import { TipContentProps, TipTypes } from './types'

const TipContent: FC<TipContentProps> = ({
  type,
  title,
  children,
  onClose,
}) => {
  const iconClassName: { [key in TipTypes]: string } = {
    success: 'glyphicon glyphicon-ok-sign',
    info: 'glyphicon glyphicon-info-sign',
    warning: 'glyphicon glyphicon-exclamation-sign',
    danger: 'glyphicon glyphicon-remove-sign',
  }

  return (
    <div className='gm-tip panel panel-default gm-box-shadow-bottom'>
      <button type='button' className='close' onClick={onClose}>
        <span>&times;</span>
      </button>
      <i className={'text-' + type + ' ' + iconClassName[type]} />
      <div className='panel-body'>
        {title ? (
          <div>
            <strong>{title}</strong>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  )
}
export default TipContent
