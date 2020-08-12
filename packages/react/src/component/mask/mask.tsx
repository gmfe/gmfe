import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface MaskProps extends HTMLAttributes<HTMLDivElement> {
  opacity?: number
}

const Mask: FC<MaskProps> = ({ opacity = 0.5, className, style, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames('gm-mask', className)}
      style={Object.assign(
        {
          background: `rgba(0,0,0, ${opacity})`,
        },
        style
      )}
    />
  )
}

export default Mask
