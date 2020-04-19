import React, { FC, useCallback, MouseEvent } from 'react'
import classNames from 'classnames'
import A from './a'
import { SingleItemProps } from './types'

const SingleItem: FC<SingleItemProps> = ({ data, selected, onSelect }) => {
  const { link, name, icon } = data
  const active = selected === link

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      onSelect(data)
    },
    [onSelect, data]
  )

  return (
    <div className={classNames('gm-nav-one-box', { active })}>
      <A href={link} className='gm-nav-one' onClick={handleClick}>
        <div className='gm-nav-one-icon'>{icon}</div>
        <div className='gm-nav-one-text'>{name}</div>
      </A>
    </div>
  )
}

export default SingleItem
