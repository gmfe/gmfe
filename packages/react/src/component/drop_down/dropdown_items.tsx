import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

const DropdownItems: FC<HTMLAttributes<HTMLUListElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <ul {...rest} className={classNames('dropdown-menu', className)}>
      {children}
    </ul>
  )
}

export default DropdownItems
