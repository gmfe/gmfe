import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Popover from '../popover'
import Button from '../button'

const DropDown = ({
  children,
  className,
  popup,
  split,
  right,
  cartClassName,
  ...rest
}) => {
  const refPopover = useRef(null)

  const handlePopupClick = () => {
    refPopover.current.apiDoSetActive(false)
  }

  if (split) {
    return (
      <div
        {...rest}
        className={classNames(
          'gm-dropdown btn-group gm-dropdown-split',
          className
        )}
      >
        {children}
        <Popover
          ref={refPopover}
          animName
          type='click'
          right
          popup={
            <div className='gm-dropdown-split-popup' onClick={handlePopupClick}>
              {popup}
            </div>
          }
        >
          <Button className={classNames(cartClassName)}>
            <span className='caret' />
          </Button>
        </Popover>
      </div>
    )
  }

  return (
    <Popover
      ref={refPopover}
      animName='fade-in-bottom'
      type='click'
      right={right}
      popup={
        <div className='gm-dropdown-popup' onClick={handlePopupClick}>
          {popup}
        </div>
      }
    >
      <div {...rest} className={classNames('gm-dropdown btn-group', className)}>
        {children}
      </div>
    </Popover>
  )
}

DropDown.propTypes = {
  popup: PropTypes.element.isRequired,
  split: PropTypes.bool,
  right: PropTypes.bool, // 非 split 有效
  cartClassName: PropTypes.string, // split true时有效
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object
}

DropDown.defaultProps = {
  split: false
}

export default DropDown
