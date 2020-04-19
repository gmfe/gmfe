import React, { ComponentType, FC, ReactNode, useMemo, useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { Flex } from '@gmfe/react'
import Context from './context'
import { devWarnForHook, warn } from '@gm-common/tool'

interface TabOptions {
  name: string
  key: string
  content: ComponentType | ReactNode
}

export interface FullTabV2Props {
  tabs: TabOptions[]
  activeKey?: string
  defaultActiveKey?: string
  onChange?(key: string): void
  isLazy?: boolean
  className?: string
  style?: object
}

const FullTabV2: FC<FullTabV2Props> = ({
  tabs,
  activeKey,
  defaultActiveKey,
  onChange,
  isLazy = true,
  className,
  ...rest
}) => {
  devWarnForHook(() => {
    if (tabs.length === 0) {
      warn('tabs 长度不能为0')
    }
    if (!_.isUndefined(activeKey) && !_.isUndefined(defaultActiveKey)) {
      warn('不能同时使用 activeKey 和 defaultActive !')
    } else {
      if (!_.isUndefined(activeKey) && !_.isFunction(onChange)) {
        warn('若使用 activeKey,请提供 onChange 函数 !')
      }

      if (!_.isUndefined(defaultActiveKey) && !_.isString(defaultActiveKey)) {
        warn('defaultActiveKey must be string')
      }
    }
  })

  const [tabActiveKey, setTabActiveKey] = useState(defaultActiveKey || tabs[0].key)

  const handleTabChange = (key: string): void => {
    _.isUndefined(activeKey) && setTabActiveKey(key) // 如果有activeKey,setState没意义(此组件受props控制)

    onChange && onChange(key)
  }

  const _activeKey = activeKey || tabActiveKey

  const tabPanels = useMemo(
    () =>
      _.map(tabs, (tab) => (
        <div
          key={tab.key}
          className={classNames({
            hidden: _activeKey !== tab.key,
          })}
        >
          {tab.content}
        </div>
      )),
    [tabs, _activeKey]
  )

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
                  {_.map(tabs, (tab) => (
                    <div
                      key={tab.key}
                      className={classNames('gm-framework-full-tabs-item', {
                        active: tab.key === _activeKey,
                      })}
                      onClick={() => handleTabChange(tab.key)}
                    >
                      {tab.name}
                    </div>
                  ))}
                </Flex>
              </div>
            </Flex>
          )}
          <div className='gm-framework-full-tabs-content'>
            {isLazy ? tabPanels.find((tab) => tab.key === _activeKey) : tabPanels}
          </div>
        </div>
      )}
    </Context.Consumer>
  )
}

export default FullTabV2
