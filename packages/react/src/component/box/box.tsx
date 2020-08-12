import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  hasGap?: boolean
}
/** Box，用来包裹一块内容 */
const Box: FC<BoxProps> = (props) => {
  const { hasGap, className, children, ...rest } = props

  return (
    <div
      {...rest}
      className={classNames(
        'gm-box',
        {
          'gm-padding-tb-10 gm-padding-lr-20 ': hasGap,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

export default Box
