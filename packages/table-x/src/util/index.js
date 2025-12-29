import React from 'react'
import { getLocale } from '@gmfe/locales'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'
import SVGEmpty from '../../svg/empty.svg'
import { Flex, EVENT_TYPE } from '@gmfe/react'
import BatchActionBar from './batch_action_bar'
import SortHeader from './sort_header'
import {
  OperationHeader,
  OperationDelete,
  OperationRecover,
  OperationDetail,
  OperationCell,
  OperationRowEdit,
  OperationIconTip
} from './operation'
import { EditButton, EditOperation } from './edit'

const TABLE_X_SELECT_ID = 'table_x_select_id'
const TABLE_X_EXPAND_ID = 'table_x_expand_id'
const TABLE_X_DIY_ID = 'table_x_diy_id'
const TABLE_X_SUB_TABLE_ID = 'table_x_sub_table_id'
const TABLE_X = {
  HEIGHT_HEAD_TR: 46,
  HEIGHT_TR: 60,
  WIDTH_FUN: 40,
  // 序号
  WIDTH_NO: 56,
  // 操作区
  WIDTH_OPERATION: 100,
  // MoreSelect 类似
  WIDTH_SEARCH: 168,
  // number input
  WIDTH_NUMBER: 80,
  // Select
  WIDTH_SELECT: 148,
  // DatePicker
  WIDTH_DATE: 110
}

// 私有。这些默认值都不会被tableX真正使用到，所以就这么定义了。
const __DEFAULT_COLUMN = {
  minWidth: 7.77,
  width: 17.77,
  maxWidth: 1777.77
}

const Mask = ({ style, children }) => {
  return (
    <Flex
      column
      alignCenter
      justifyCenter
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: 'var(--gm-table-x-header-height, 46px)',
        ...style
      }}
    >
      {children}
    </Flex>
  )
}

Mask.propTypes = {
  style: PropTypes.object
}

const Empty = props => {
  return (
    <Mask {...props}>
      <div style={{ padding: '10px' }}>
        <SVGEmpty style={{ width: '70px', height: '70px' }} />
        <div className='gm-text-desc'>{getLocale('没有数据了')}</div>
      </div>
    </Mask>
  )
}

const Loading = ({ style, ...rest }) => {
  return (
    <Mask
      style={{
        backgroundColor: 'rgba(255,255,255,0.8)',
        ...style
      }}
      {...rest}
    >
      {getLocale('加载数据中...')}
    </Mask>
  )
}

const Resizer = props => (
  <div
    {...props}
    className={classNames('gm-table-x-resizer', props.className)}
  />
)

Resizer.propTypes = {
  className: PropTypes.string
}

const CellEmpty = () => <span className='gm-text-desc'>-</span>

const asPx = value => {
  value = Number(value)
  return Number.isNaN(value) ? null : `${value}px`
}

const getFirstDefined = (a, b) => {
  // 如果取的是默认值
  if (
    a === __DEFAULT_COLUMN.width &&
    (b === __DEFAULT_COLUMN.minWidth || b === __DEFAULT_COLUMN.maxWidth)
  ) {
    return undefined
  } else if (a !== __DEFAULT_COLUMN.width) {
    return a
  } else {
    return b
  }
}

// width 200  =>👉  flex: 200 0 auto; width: 200px; max-width: 200px;
// maxWidth 300  =>👉  max-width: 300px;
// minWidth 200  =>👉  flex: 200 0 auto; width: 200px;
// minWidth 50 width 100  =>👉  flex: 100 0 auto; width: 100px; max-width: 100px;
const getColumnStyle = ({ width, minWidth, maxWidth }) => {
  const _width = getFirstDefined(width, minWidth)
  const _maxWidth = getFirstDefined(width, maxWidth)
  return {
    flex: `${_width} 0 auto`,
    width: asPx(_width),
    maxWidth: asPx(_maxWidth)
  }
}

const afterScroll = () => {
  window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.TABLE_SCROLL))
}

function getColumnKey(column) {
  // 如果是字符串就取 accessor
  if (_.isString(column.accessor)) {
    return column.accessor
  }
  // 如果 accessor 是函数，则一定会提供 id，否则 react-table 会报错
  else if (_.isFunction(column.accessor) && column.id) {
    return column.id
  }
  // 额外的情况，有些时候只有id，比如 diy 存储就只存了 id，因为 函数没法存储
  else if (column.id) {
    return column.id
  }

  // 其他情况没法获得 key
  return null
}

export {
  TABLE_X,
  TABLE_X_SELECT_ID,
  TABLE_X_EXPAND_ID,
  TABLE_X_DIY_ID,
  TABLE_X_SUB_TABLE_ID,
  __DEFAULT_COLUMN,
  Empty,
  Loading,
  SortHeader,
  Resizer,
  CellEmpty,
  OperationHeader,
  OperationDelete,
  OperationRecover,
  OperationDetail,
  OperationCell,
  OperationRowEdit,
  OperationIconTip,
  EditButton,
  EditOperation,
  BatchActionBar,
  getColumnStyle,
  afterScroll,
  getColumnKey
}
