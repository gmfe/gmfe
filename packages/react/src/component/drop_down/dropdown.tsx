import React, { FC, useRef } from 'react'
import classNames from 'classnames'
import { DropdownProps } from './types'
import { Popover } from '../popover'
import { Button } from '../button'

const Dropdown: FC<DropdownProps> = ({
  children,
  className,
  popup,
  split,
  right,
  cartClassName,
  ...rest
}) => {
  const popoverRef = useRef<Popover>(null)

  const handlePopupClick = () => {
    popoverRef.current!.apiDoSetActive(false)
  }

  /* eslint-disable */
  if (split) {
    return (
      <div
        {...rest}
        className={classNames(
          'gm-dropdown',
          'gm-dropdown-split',
          'btn-group',
          className
        )}
      >
        {children}
        <Popover ref={popoverRef} type='click' right popup={<div>{popup}</div>}>
          <Button className={classNames(cartClassName)}>
            <span className='caret' />
          </Button>
        </Popover>
      </div>
    )
  }

  return (
    <Popover
      ref={popoverRef}
      type='click'
      right={right}
      popup={
        <div className='gm-dropdown-popup' onClick={handlePopupClick}>
          {popup}
        </div>
      }
    >
      <div
        {...rest}
        className={classNames('gm-dropdown', 'btn-group', className)}
      >
        {children}
      </div>
    </Popover>
  )
}
/* eslint-enable */
export default Dropdown
