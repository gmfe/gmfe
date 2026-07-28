import React, { useState, useMemo, useRef, useEffect } from 'react'
import { getLocale } from '@gmfe/locales'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Storage, Popover } from '@gmfe/react'
import SVGSetting from '../../../svg/setting.svg'
import {
  TABLE_X,
  TABLE_X_SELECT_ID,
  TABLE_X_EXPAND_ID,
  TABLE_X_DIY_ID,
  getColumnKey,
  OperationIconTip
} from '../../util'
import TableX from '../../base'
import { devWarn } from '@gm-common/tool'
import DiyTableXModal from './components/diy_table_x_modal'

/**
 * 把selector, expander 分离出来,不参与diy
 * @param columns
 * @returns {[][]}
 */
function splitColumns(columns) {
  const notDiyCols = []
  const diyCols = []
  for (const item of columns) {
    if ([TABLE_X_EXPAND_ID, TABLE_X_SELECT_ID].includes(item.id)) {
      notDiyCols.push(item)
    } else {
      diyCols.push(item)
    }
  }
  return [notDiyCols, diyCols]
}

/**
 * 生成新的columns
 * @param initColumns 原始columns
 * @param mixColumns 需要混合的columns(优先取这里的值)
 * @returns {(*[]|Array)[]}
 */
function generateDiyColumns(initColumns, mixColumns) {
  const [notDiyCols, diyCols] = splitColumns(initColumns)
  const mixColumnsMap = {}
  _.forEach(mixColumns, (item, index) => {
    item.sortNumber = item.diySortNumber !== undefined ? item.diySortNumber : index
    mixColumnsMap[item.key] = item
  })
  let diyColumns = _.map(diyCols, column => {
    const key = getColumnKey(column)
    // 能获取 key 才可能使用 diy
    if (key === null) {
      return column
    }

    // col 默认显示，以及 默认开启diy
    const { show = true, diyEnable = true } = column
    const newColumn = {
      ...column,
      key, // 把key记录下来,作为这个列的唯一标识
      show,
      diyEnable
    }

    // localstorage中储存的列
    const localItem = mixColumnsMap[key]
    // localstorage的值覆盖初始值
    if (localItem) {
      newColumn.show = localItem.show
      newColumn.sortNumber = localItem.sortNumber
    }
    return newColumn
  })

  diyColumns = _.sortBy(diyColumns, function(o) {
    return o.sortNumber
  })

  return [notDiyCols, diyColumns]
}

/**
 * 过滤多余数据，避免复杂数据出现JSON循环引用报错问题
 * @param columns
 * @returns {Array}
 */
function getStorageColumns(columns) {
  return _.map(columns, col => {
    const { key, show, diyEnable, diySortNumber } = col
    return { key, show, diyEnable, diySortNumber }
  })
}

// 列宽持久化 storage 后缀，与字段配置 ${id} 隔离
const COL_WIDTH_SUFFIX = '_col_width'

function diyTableXHOC(Component) {
  const DiyTableX = ({ id, columns, diyGroupSorting, showColumnBorder, enableColumnWidthPersist = false, ...rest }) => {
    // 没id强制报错
    devWarn(() => {
      if (id === undefined) {
        throw Error('DiyTableX必须要有id！')
      }
    })

    // 只需要执行第一遍就可以了，使用函数
    const [diyCols, setDiyCols] = useState(
      () => generateDiyColumns(columns, Storage.get(id) || [])[1]
    )
    const [dialogKey, setDialogKey] = useState(0)
    const [tableKey, setTableKey] = useState(0)

    // 列宽状态：{columnKey: width} 映射，仅当 enableColumnWidthPersist 开启时才从 localStorage 恢复
    const [resized, setResized] = useState(() => {
      if (!enableColumnWidthPersist) return {}
      try {
        return Storage.get(id + COL_WIDTH_SUFFIX) || {}
      } catch (e) {
        return {}
      }
    })

    useEffect(() => {
      setDiyCols(generateDiyColumns(columns, Storage.get(id) || [])[1])
    }, [columns])

    const popoverRef = useRef()

    // 稳定的列宽变更回调引用，避免 useMemo 因闭包变化频繁重建 columns
    const resizeRef = useRef()
    resizeRef.current = (columnKey, newWidth) => {
      setResized(prev => {
        const next = { ...prev, [columnKey]: newWidth }
        persistRef.current(next)
        return next
      })
    }

    // 防抖持久化列宽
    const persistRef = useRef()
    persistRef.current = _.debounce(widthMap => {
      if (!enableColumnWidthPersist) return
      try {
        Storage.set(id + COL_WIDTH_SUFFIX, widthMap)
      } catch (e) {
        console.warn('[diyTableXHOC] persist column width failed', e)
      }
    }, 300)

    const handleDiyColumnsSave = cols => {
      setDiyCols(cols)
      Storage.set(id, getStorageColumns(cols))
    }

    const handleResetDefault = () => {
      Storage.remove(id)
      if (enableColumnWidthPersist) {
        Storage.remove(id + COL_WIDTH_SUFFIX)
      }
      if (persistRef.current && persistRef.current.cancel) {
        persistRef.current.cancel()
      }
      const [, defaultCols] = generateDiyColumns(columns, [])
      setDiyCols(defaultCols)
      setResized({})
      setDialogKey(prev => prev + 1)
      setTableKey(prev => prev + 1)
    }

    const handleCancel = () => {
      popoverRef.current.apiDoSetActive(false)
    }

    const _columns = useMemo(() => {
      const [notDiyCols, cols] = generateDiyColumns(columns, diyCols)

      // 弹窗左侧"可选字段"需保持定义顺序不变，而 cols 已按 sortNumber 排序
      // 用 props.columns 的定义顺序重建弹窗用的 columns 数组，数据来自 cols
      const colsMap = _.keyBy(cols, col => getColumnKey(col))
      const dialogColumns = _.compact(_.map(columns, propCol => {
        const key = getColumnKey(propCol)
        if (!key) return null
        return colsMap[key] || null
      }))

      // 注入列宽和 _onResize 回调
      const colsWithResize = _.map(cols, col => {
        const key = getColumnKey(col)
        if (!key) return col
        const patched = { ...col, _onResize: (...args) => resizeRef.current(...args) }
        if (resized[key] !== undefined) {
          patched.width = resized[key]
        }
        return patched
      })
      return [
        {
          id: TABLE_X_DIY_ID,
          width: TABLE_X.WIDTH_FUN,
          maxWidth: TABLE_X.WIDTH_FUN,
          accessor: TABLE_X_DIY_ID,
          fixed: 'left',
          thClassName: 'gm-table-x-icon-column',
          tdClassName: 'gm-table-x-icon-column',
          Cell: () => null, // 只是用来占据空间
          Header: () => (
            <Popover
              ref={popoverRef}
              showArrow
              offset={-10}
              popup={
                <DiyTableXModal
                  key={dialogKey}
                  diyGroupSorting={diyGroupSorting}
                  columns={dialogColumns}
                  onSave={handleDiyColumnsSave}
                  onCancel={handleCancel}
                  onResetDefault={handleResetDefault}
                />
              }
            >
              <div className='gm-table-x-icon'>
                <OperationIconTip tip={getLocale('表头设置')}>
                  <div>
                    <SVGSetting className='gm-cursor gm-text-hover-primary' />
                  </div>
                </OperationIconTip>
              </div>
            </Popover>
          )
        },
        ...notDiyCols,
        ...colsWithResize
      ]
    }, [columns, diyCols, resized])

    return (
      <Component
        key={tableKey}
        {...rest}
        id={id}
        columns={_columns}
        className={classNames(rest.className, showColumnBorder && 'gm-table-x-show-column-border')}
      />
    )
  }

  DiyTableX.propTypes = {
    ...TableX.propTypes,

    id: PropTypes.string.isRequired,
    /** 是否持久化列宽到 localStorage，默认关闭 */
    enableColumnWidthPersist: PropTypes.bool,
    /** 是否显示列表边框 */
    showColumnBorder: PropTypes.bool,
    /** 分组排序 */
    diyGroupSorting: PropTypes.array.isRequired,
    /** column 需要有 diyGroupName 字段 和 （Header | diyItemText） */
    columns: props => {
      _.each(props.columns, column => {
        const key = getColumnKey(column)
        if (
          key &&
          ![TABLE_X_SELECT_ID, TABLE_X_EXPAND_ID].includes(column.id)
        ) {
          if (!_.isString(column.Header) && !column.Header) {
            console.error('column need diyItemText', column)
          }
          if (!column.diyGroupName) {
            console.error('column need diyGroupName', column)
          }
        }
      })
    }
  }

  DiyTableX.defaultProps = {
    showColumnBorder: true
  }

  return DiyTableX
}

export default diyTableXHOC
