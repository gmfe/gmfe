import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'

function isOneActive(oneSub, selected) {
  return !!_.find(oneSub, two => {
    return !!_.find(two.sub, three => {
      return selected.includes(three.link)
    })
  })
}

const A = ({ href, ...rest }) => {
  return <a {...rest} href={`#${href}`} />
}

A.propTypes = {
  href: PropTypes.string.isRequired
}

const Portal = props => {
  const refEl = useRef(document.createElement('div'))

  useEffect(() => {
    const container = document.getElementById('gmNavPopupContainer')
    container.append(refEl.current)
  }, [])

  return ReactDOM.createPortal(props.children, refEl.current)
}

const Popup = ({ parentRect, data, selected, onSelect }) => {
  const refDom = useRef(null)
  const [marginTop, setMarginTop] = useState(0)

  useEffect(() => {
    const offsetHeight = refDom.current.offsetHeight

    const diff =
      parentRect.y + offsetHeight - document.documentElement.clientHeight

    if (diff > 0) {
      setMarginTop(-diff)
    }
  }, [parentRect.y])

  return (
    <div
      ref={refDom}
      className='gm-nav-popup'
      style={{
        marginTop: marginTop + 'px',
        top: parentRect.top
      }}
    >
      <Flex>
        {_.map(data, (v, i) => (
          <div key={i} className='gm-nav-two' style={v.style}>
            {!!v.name && <div className='gm-nav-two-title'>{v.name}</div>}
            <div>
              {_.map(v.sub, (s, si) => (
                <A
                  key={si}
                  href={s.link}
                  className={classNames('gm-nav-three', {
                    active: selected.startsWith(s.link)
                  })}
                  onClick={e => {
                    e.preventDefault()
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

Popup.propTypes = {
  parentRect: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

const Item = props => {
  const {
    data: { icon, name, link, sub },
    selected,
    onSelect,
    showActive
  } = props

  const ref = useRef(null)
  const [rect, setRect] = useState(null)

  const active = isOneActive(sub, selected)

  useEffect(() => {
    if (showActive === link) {
      setRect(ref.current.getBoundingClientRect())
    }
  }, [showActive, link])

  const handleClick = e => {
    e.preventDefault()
    let target = props.data

    // 直达末端路由
    while (target.sub && target.sub[0]) {
      target = target.sub[0]
    }

    onSelect(target)
  }

  const handleSelect = data => {
    onSelect(data)
    setRect(null)
  }

  const handleMouseEnter = e => {
    setRect(ref.current.getBoundingClientRect())
  }

  const handleMouseLeave = () => {
    setRect(null)
  }

  return (
    <div
      ref={ref}
      className={classNames('gm-nav-one-box', {
        active
      })}
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
            <Popup
              parentRect={rect}
              data={sub}
              onSelect={handleSelect}
              selected={selected}
            />
          )}
        </Portal>
      )}
    </div>
  )
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  showActive: PropTypes.string
}

const Nav = props => {
  const {
    logo,
    logoActive,
    data,
    selected,
    onSelect,
    showActive,
    other,
    className,
    style,
    ...rest
  } = props

  return (
    <Flex column {...rest} className={classNames('gm-nav', className)}>
      <div
        className={classNames('gm-nav-logo', {
          active: logoActive
        })}
      >
        {logo}
      </div>
      <Flex flex column className='gm-nav-content'>
        {_.map(data, (one, i) => (
          <Item
            key={i}
            data={one}
            onSelect={onSelect}
            selected={selected}
            showActive={showActive}
          />
        ))}
        <div style={{ height: '100px' }} />
        {other}
      </Flex>
      <div id='gmNavPopupContainer' />
    </Flex>
  )
}

Nav.Item = Item
Nav.propTypes = {
  logo: PropTypes.element,
  logoActive: PropTypes.bool,
  /**
   * 三级菜单，其中 2 级有个 style
   * [{link, name, icon, sub: [{link, name, style, sub: [{link, name}]}]}]
   * sub 没有的话就没有 popup
   * */
  data: PropTypes.array.isRequired,
  /** pathname 会匹配到第三级 link */
  selected: PropTypes.string.isRequired,
  /** 直接吐 item，如果是一二级会找到第三级的item吐 */
  onSelect: PropTypes.func.isRequired,
  /** 控制 浮层的线上，如商品库传 merchandise */
  showActive: PropTypes.string,
  other: PropTypes.element,
  className: PropTypes.string,
  style: PropTypes.object
}

export default Nav
