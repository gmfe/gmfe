import React, { FC, useCallback, useEffect, useRef, useState, MouseEvent } from 'react'
import classNames from 'classnames'
import { ItemProps, NavData2RdOptions, NavData3RdOptions } from './types'
import A from './a'
import Portal from './portal'
import Popup from './popup'

interface IsOneActive {
  (selected: string, one?: NavData2RdOptions[]): boolean
}

const isOneActive: IsOneActive = (selected, one) =>
  !!one?.find((two) => two.sub?.find((three) => selected.includes(three.link)))

const Item: FC<ItemProps> = ({ data, selected, onSelect, showActive }) => {
  const { icon, name, link, sub } = data
  const ref = useRef<HTMLDivElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const active = isOneActive(selected, sub)

  useEffect(() => {
    if (showActive === link) {
      setRect(ref.current!.getBoundingClientRect())
    }
  }, [showActive, link])

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      onSelect(sub?.[0].sub?.[0])
    },
    [sub, onSelect]
  )

  const handleSelect = useCallback(
    (data: NavData3RdOptions) => {
      onSelect(data)
      setRect(null)
    },
    [onSelect]
  )

  const handleMouseEnter = useCallback(() => {
    setRect(ref.current!.getBoundingClientRect())
  }, [ref])

  const handleMouseLeave = useCallback(() => {
    setRect(null)
  }, [])

  return (
    <div
      ref={ref}
      className={classNames('gm-nav-one-box', { active })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <A href={link} className='gm-nav-one' onClick={handleClick}>
        <div className='gm-nav-one-icon'>{icon}</div>
        <div className='gm-nav-one-text'>{name}</div>
      </A>
      {sub && <div className='gm-nav-one-triangle' />}
      {sub && (
        <Portal>
          {rect && (
            <Popup parentRect={rect} data={sub} selected={selected} onSelect={handleSelect} />
          )}
        </Portal>
      )}
    </div>
  )
}
export default Item
