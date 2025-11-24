import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'
import StickyLayout from '../../hoc/sticky_layout'

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

const BoxHeader = StickyLayout(props => {
  const { info, action, headerProps = {} } = props
  const { className: headerClassName } = headerProps

  return (
    <Flex
      {...headerProps}
      className={classNames(
        'gm-box-table-header common-sticky-header',
        headerClassName
      )}
      alignCenter
    >
      <Flex>{info}</Flex>
      <Flex flex />
      <Flex>{action}</Flex>
    </Flex>
  )
})

const BoxTable = props => {
  const { children, className, ...rest } = props

  return (
    <div {...rest} className={classNames('gm-box gm-box-table', className)}>
      <BoxHeader {...props} />
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
  headerProps: PropTypes.object
}

export default BoxTable
