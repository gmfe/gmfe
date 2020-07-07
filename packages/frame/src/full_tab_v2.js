import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { Flex } from '@gmfe/react'
import Context from './context'

const FullTabV2 = ({
  tabs,
  activeKey,
  defaultActiveKey,
  onChange,
  isLazy,
  className,
  ...rest
}) => {
  const [tabActiveKey, setTabActiveKey] = useState(
    defaultActiveKey || tabs[0].key
  )

  const handleTabChange = (key) => {
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
            {isLazy
              ? tabPanels.find((tab) => tab.key === _activeKey)
              : tabPanels}
          </div>
        </div>
      )}
    </Context.Consumer>
  )
}

FullTabV2.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ),

  onChange: PropTypes.func,
  activeKey: PropTypes.string,

  defaultActiveKey: (props) => {
    const { activeKey, defaultActiveKey, onChange } = props
    if (!_.isUndefined(activeKey) && !_.isUndefined(defaultActiveKey)) {
      console.error('不能同时使用 activeKey 和 defaultActive !')
    } else {
      if (!_.isUndefined(activeKey) && !_.isFunction(onChange)) {
        console.error('若使用 activeKey,请提供 onChange 函数 !')
      }

      if (!_.isUndefined(defaultActiveKey) && !_.isString(defaultActiveKey)) {
        console.error('defaultActiveKey must be string')
      }
    }
  },

  isLazy: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

FullTabV2.defaultProps = {
  isLazy: true,
}

export default FullTabV2
