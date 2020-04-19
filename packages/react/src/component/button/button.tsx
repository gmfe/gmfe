import React, { FC, useState, MouseEvent } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { is } from '@gm-common/tool'
import { Loading } from '../loading'
import { ButtonProps } from './types'

const Button: FC<ButtonProps> = ({
  type = 'default',
  plain,
  size,
  block,
  disabled,
  onClick = _.noop,
  loading,
  href,
  children,
  htmlType = 'button',
  className,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const loadFlag = loading || isLoading

  const handleClick = (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => {
    if (loadFlag) {
      return
    }

    const result = onClick(event)

    if (!is.promise(result)) {
      return
    }

    setIsLoading(true)

    Promise.resolve(result).finally(() => {
      setIsLoading(false)
    })
  }
  const Tag = type === 'link' && href ? 'a' : 'button'

  return (
    <Tag
      {...rest}
      type={htmlType}
      href={href}
      className={classNames(
        `gm-btn gm-btn-${type}`,
        {
          'gm-btn-block': block,
          [`gm-btn-${size}`]: size,
          'gm-btn-plain': type !== 'link' && plain,
        },
        className
      )}
      disabled={loadFlag || disabled}
      onClick={handleClick}
    >
      {loadFlag && <Loading className='gm-btn-loading' size={12} />}
      {children}
    </Tag>
  )
}

export default Button
