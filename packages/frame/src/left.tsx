import React, { FC, CSSProperties, useContext } from 'react'
import classNames from 'classnames'
import Context from './context'

export interface LeftProps {
  style: CSSProperties
  className: string
  children: React.ReactElement
}

const Left: FC<LeftProps> = ({ style, className, children, ...rest }) => {
  const { leftWidth } = useContext(Context)

  return (
    <div
      {...rest}
      style={Object.assign({ width: leftWidth }, style)}
      className={classNames('gm-framework-left-default', className)}
    >
      <div className='gm-framework-left-default-inner'>{children}</div>
    </div>
  )
}

export default Left
