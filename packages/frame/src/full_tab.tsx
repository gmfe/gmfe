import React, { useEffect, useState, CSSProperties, FC } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { Flex } from '@gmfe/react'
import Context from './context'

export interface FullTabProps {
  tabs: string[]
  onChange?(key: number): void
  active?: number
  isStatic?: boolean
  className?: string
  style?: CSSProperties
}

const FullTab: FC<FullTabProps> = ({
  tabs,
  active,
  onChange,
  isStatic = false,
  className,
  children,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState(active || 0)

  useEffect(() => {
    if (active !== undefined && active !== activeIndex) {
      setActiveIndex(active)
    }
  }, [active])

  const handleTab = (i: number) => {
    if (onChange) {
      onChange(i)
    } else {
      setActiveIndex(i)
    }
  }

  const tabPanels = _.map(React.Children.toArray(children), (child, i) => (
    <div
      key={i}
      className={classNames({
        hidden: activeIndex !== i,
      })}
    >
      {child}
    </div>
  ))

  return (
    <Context.Consumer>
      {({ leftWidth }) => (
        <div
          {...rest}
          className={classNames(
            'gm-framework-full-tabs gm-framework-content-full',
            className
          )}
        >
          {tabs.length > 1 && (
            <Flex column justifyEnd className='gm-framework-full-tabs-list-box'>
              <div
                className='gm-framework-full-tabs-list'
                style={{
                  left: leftWidth,
                }}
              >
                <Flex alignEnd className='gm-framework-full-tabs-list-inner'>
                  {_.map(tabs, (tab, i) => (
                    <div
                      key={i}
                      className={classNames('gm-framework-full-tabs-item', {
                        active: i === activeIndex,
                      })}
                      onClick={() => handleTab(i)}
                    >
                      {tab}
                    </div>
                  ))}
                </Flex>
              </div>
            </Flex>
          )}
          <div className='gm-framework-full-tabs-content'>
            {isStatic ? tabPanels : tabPanels[activeIndex]}
          </div>
        </div>
      )}
    </Context.Consumer>
  )
}

export default FullTab
