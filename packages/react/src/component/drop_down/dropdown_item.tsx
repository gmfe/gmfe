import React, { FC } from 'react'
import classNames from 'classnames'
import { DropdownItemProps } from './types'

const DropdownItem: FC<DropdownItemProps> = ({
  active,
  className,
  disabled,
  children,
  ...rest
}) => {
  const handleClick = (): void => {
    if (disabled) {
      return
    }
    const { onClick } = rest
    onClick && onClick()
  }

  return (
    <li
      {...rest}
      className={classNames(
        active,
        {
          disabled,
        },
        className
      )}
      onClick={handleClick}
    >
      <a>{children}</a>
    </li>
  )
}

export default DropdownItem
