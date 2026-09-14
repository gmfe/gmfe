import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'

// 暂时没什么用
const Info = props => {
  return (
    <div
      {...props}
      className={classNames('gm-box-table-info', props.className)}
    />
  )
}

Info.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * @param {boolean} [headerScrollable=false]
 * 窄屏友好头栏：左侧 info 可横滑（隐藏滚动条），右侧 action 不收缩钉住。
 * 默认关闭，避免影响未适配的列表。
 */
const BoxTable = props => {
  const {
    info,
    action,
    children,
    className,
    headerProps = {},
    headerScrollable = false,
    ...rest
  } = props
  const { className: headerClassName } = headerProps

  return (
    <div {...rest} className={classNames('gm-box gm-box-table', className)}>
      <Flex
        {...headerProps}
        className={classNames(
          'gm-box-table-header',
          {
            'gm-box-table-header-scrollable': headerScrollable
          },
          headerClassName
        )}
        alignCenter
      >
        <Flex className='gm-box-table-header-info'>{info}</Flex>
        {/* scrollable 时 spacer 不再 flex:1，由 CSS 收成小间距 */}
        <Flex
          flex={!headerScrollable}
          className='gm-box-table-header-spacer'
        />
        <Flex className='gm-box-table-header-action'>{action}</Flex>
      </Flex>
      <div>{children}</div>
    </div>
  )
}

BoxTable.Info = Info

BoxTable.propTypes = {
  info: PropTypes.element,
  action: PropTypes.element,
  className: PropTypes.string,
  style: PropTypes.object,
  headerProps: PropTypes.object,
  /** 窄屏：info 可横滑（隐藏滚动条），action 钉住不收缩 */
  headerScrollable: PropTypes.bool
}

BoxTable.defaultProps = {
  headerScrollable: false
}

export default BoxTable
