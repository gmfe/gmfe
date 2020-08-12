import React, { useEffect, FC, ComponentType, ReactNode } from 'react'
import { Flex, EVENT_TYPE } from '@gmfe/react'
import classNames from 'classnames'
import _ from 'lodash'
import Context from './context'

export interface FrameworkProps {
  showMobileMenu?: boolean
  isFullScreen?: boolean
  leftWidth: string
  menu: ComponentType | ReactNode
  rightTop: ComponentType | ReactNode
  scrollTop?: void
}

interface FrameworkFC extends FC<FrameworkProps> {
  scrollTop(): void
}

const Framework: FrameworkFC = ({
  showMobileMenu,
  isFullScreen,
  menu,
  rightTop,
  leftWidth,
  children,
}) => {
  const addOverflowClass = () => {
    let flag: any = window.document.body.dataset.overflowFlag || 0
    flag++
    window.document.body.dataset.overflowFlag = flag

    if (flag === 1) {
      window.document.body.classList.add('gm-overflow-hidden')
    }
  }

  const removeOverflowClass = () => {
    let flag: any = window.document.body.dataset.overflowFlag || 0
    flag--
    window.document.body.dataset.overflowFlag = flag
    if (flag === 0) {
      window.document.body.classList.remove('gm-overflow-hidden')
    }
  }

  const doScroll = _.throttle(() => {
    window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.BROWSER_SCROLL))
  }, 200)

  useEffect(() => {
    window.addEventListener(EVENT_TYPE.MODAL_SHOW, addOverflowClass)
    window.addEventListener(EVENT_TYPE.MODAL_HIDE, removeOverflowClass)

    window.addEventListener(EVENT_TYPE.DRAWER_SHOW, addOverflowClass)
    window.addEventListener(EVENT_TYPE.DRAWER_HIDE, removeOverflowClass)

    window.addEventListener('scroll', doScroll)

    return () => {
      window.removeEventListener(EVENT_TYPE.MODAL_SHOW, addOverflowClass)
      window.removeEventListener(EVENT_TYPE.MODAL_HIDE, removeOverflowClass)

      window.removeEventListener(EVENT_TYPE.DRAWER_SHOW, addOverflowClass)
      window.removeEventListener(EVENT_TYPE.DRAWER_HIDE, removeOverflowClass)

      window.removeEventListener('scroll', doScroll)
    }
  }, [])

  return (
    <div
      className={classNames('gm-framework', {
        'gm-framework-mobile-menu': showMobileMenu,
      })}
    >
      <Context.Provider value={{ leftWidth: leftWidth }}>
        <div className='gm-framework-inner'>
          {isFullScreen ? (
            children
          ) : (
            <div className='gm-framework-full-height'>
              <Flex className='gm-framework-container'>
                {menu && <div className='gm-framework-left'>{menu}</div>}
                <Flex
                  flex
                  column
                  className='gm-framework-right'
                  style={{ width: `calc(100% - ${leftWidth})` }}
                >
                  {rightTop && <div className='gm-framework-right-top'>{rightTop}</div>}
                  <div className='gm-framework-content'>{children}</div>
                </Flex>
              </Flex>
            </div>
          )}
        </div>
      </Context.Provider>
    </div>
  )
}

Framework.scrollTop = () => {
  window.scroll(0, 0)
}

export default Framework
