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
        marginTop: '46px',
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

const Empty = () => {
  return (
    <Mask>
      <div style={{ padding: '10px' }}>
        <SVGEmpty style={{ width: '70px', height: '70px' }} />
        <div className='gm-text-desc'>{getLocale('没有数据了')}</div>
      </div>
    </Mask>
  )
}

const Loading = () => {
  return (
    <Mask
      style={{
        backgroundColor: 'rgba(255,255,255,0.8)'
      }}
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

// 兜底最小宽度：未显式声明 width/minWidth 的列，以此为 basis 起点，避免塌陷
const FALLBACK_MIN_BASIS = 60

// 设计原则：
// - 显式设置 width  → 固定列宽（flex-grow:0），列拖拽也通过设置 width 实现，保持一致
// - 仅设 minWidth  → 以此为起点参与剩余空间分配（flex-grow:1）
// - 都没设        → 以 FALLBACK_MIN_BASIS 为起点参与分配（flex-grow:1）
// fixed 列的偏移依赖 react-table 的 totalLeft/totalWidth，不受此处 CSS 影响。
//
// width 200                  =>👉  flex: 0 0 200px;
// minWidth 150（无 width）   =>👉  flex: 1 0 150px;
// 都没设                      =>👉  flex: 1 0 60px;
// maxWidth 300（用户显式传）  =>👉  max-width: 300px;
// 拖拽后 width=210           =>👉  flex: 0 0 210px;  ← 固定，不再叠加 grow
const getColumnStyle = ({ width, minWidth, maxWidth }) => {
  const hasUserWidth = width !== undefined && width !== __DEFAULT_COLUMN.width
  const hasUserMinWidth =
    minWidth !== undefined && minWidth !== __DEFAULT_COLUMN.minWidth

  const style = {}

  if (hasUserWidth) {
    // 显式 width（含拖拽后的 width）：固定列宽，不参与 grow
    style.flex = `0 0 ${asPx(width)}`
  } else if (hasUserMinWidth) {
    // 仅设 minWidth：以此为起点，参与剩余空间均分
    style.flex = `1 0 ${asPx(minWidth)}`
  } else {
    // 都没设：固定 60px basis 起点（不依赖内容，避免 header/body 内容差异导致列错位）
    style.flex = `1 0 ${asPx(FALLBACK_MIN_BASIS)}`
  }

  // 仅当用户显式传 maxWidth 时才设 max-width
  if (maxWidth !== undefined && maxWidth !== __DEFAULT_COLUMN.maxWidth) {
    style.maxWidth = asPx(maxWidth)
  }

  return style
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
