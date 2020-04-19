import React, { FC, useLayoutEffect, useRef, useState } from 'react'
import { NavData2RdOptions, NavData3RdOptions } from './types'
import classNames from 'classnames'
import { Flex } from '../flex'
import A from './a'

interface PopupProps {
  parentRect: DOMRect
  data: NavData2RdOptions[]
  selected: string
  onSelect(data?: NavData3RdOptions): void
}

const Popup: FC<PopupProps> = ({ parentRect, data, selected, onSelect }) => {
  const refDom = useRef<HTMLDivElement>(null)
  const [marginTop, setMarginTop] = useState(0)

  useLayoutEffect(() => {
    const { offsetHeight } = refDom.current!
    const diff = parentRect.y + offsetHeight - document.documentElement.clientHeight
    if (diff > 0) {
      setMarginTop(-diff)
    }
  }, [parentRect])

  return (
    <div
      ref={refDom}
      className='gm-nav-popup'
      style={{ marginTop: `${marginTop}px`, top: parentRect.top }}
    >
      <Flex>
        {data.map((v, i) => (
          <div key={i} className='gm-nav-two' style={v.style}>
            {!!v.name && <div className='gm-nav-two-title'>{v.name}</div>}
            <div>
              {v.sub.map((s, si) => (
                <A
                  key={si}
                  href={s.link}
                  className={classNames('gm-nav-three', {
                    active: selected.startsWith(s.link),
                  })}
                  onClick={(event) => {
                    event.preventDefault()
                    onSelect(s)
                  }}
                >
                  {s.name}
                </A>
              ))}
            </div>
          </div>
        ))}
      </Flex>
    </div>
  )
}
export default Popup
