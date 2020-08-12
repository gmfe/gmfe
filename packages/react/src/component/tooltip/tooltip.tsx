import React, { CSSProperties, forwardRef, ReactElement, ReactNode } from 'react'
import classNames from 'classnames'
import { Popover } from '../popover'
import SVGQuestionCircle from '../../../svg/question-circle-o.svg'

export interface TooltipProps {
  popup: ReactNode
  right?: boolean
  top?: boolean
  center?: boolean
  showArrow?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactElement
}

const Tooltip = forwardRef<Popover, TooltipProps>(
  ({ popup, children, right, top, center, showArrow, className, ...rest }, ref) => (
    <Popover
      popup={popup}
      ref={ref}
      top={top}
      type='hover'
      right={right}
      offset={-8}
      center={center}
      showArrow={showArrow}
    >
      {children ?? (
        <span {...rest} className={classNames('gm-text-desc', className)}>
          <SVGQuestionCircle />
        </span>
      )}
    </Popover>
  )
)

Tooltip.displayName = 'Tooltip'

export default Tooltip
