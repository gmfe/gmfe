import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

const OperationCell: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => (
  <div {...rest} className={classNames('text-center', className)}>
    {children}
  </div>
)

export default OperationCell
