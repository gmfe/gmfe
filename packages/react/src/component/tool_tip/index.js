import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Popover from '../popover'
import classNames from 'classnames'
import SVGQuestionCircle from '../../../svg/question-circle-o.svg'

const ToolTip = (props, ref) => {
  const {
    popup,
    children,
    right,
    top,
    center,
    showArrow,
    className,
    ...rest
  } = props

  return (
    <Popover
      top={top}
      ref={ref}
      type='hover'
      right={right}
      offset={-8}
      popup={popup}
      center={center}
      showArrow={showArrow}
    >
      {children !== undefined ? (
        children
      ) : (
        <span {...rest} className={classNames('gm-text-desc', className)}>
          <SVGQuestionCircle />
        </span>
      )}
    </Popover>
  )
}

ToolTip.propTypes = {
  children: PropTypes.element,
  popup: PropTypes.element,

  right: PropTypes.bool,
  top: PropTypes.bool,
  center: PropTypes.bool,

  showArrow: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

ToolTip.defaultProps = {
  showArrow: true
}

export default forwardRef(ToolTip)
