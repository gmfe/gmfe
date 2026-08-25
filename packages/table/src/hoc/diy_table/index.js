import React, { createRef, useRef } from 'react'
import { getLocale } from '@gmfe/locales'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Storage, Popover, useTableHeaderSticky } from '@gmfe/react'
import SVGSetting from '../../../svg/setting.svg'
import { getColumnKey, referOfWidth } from '../../util'
import Table from '../../table'
import withTableSticky from '../with_table_sticky'
import { devWarn } from '@gm-common/tool'
import DiyTableModal from './diy_table_modal'
import OperationIconTip from '../../operation_icon_tip'

/** Header 内计算 sticky（在 ConfigProvider 内）；弹层通过 props 传入避免 LayerRoot 丢 Context */
function DiySettingHeader({
  popoverRef,
  diyGroupSorting,
  columns,
  onSave,
  onCancel,
  stickyHookProps,
  onResetDefault
}) {
  const stickyState = useTableHeaderSticky(stickyHookProps, 'tableConfig')
  const stickyControlPropsRef = useRef(null)
  stickyControlPropsRef.current = {
    localChecked: stickyState.localChecked,
    globalSticky: stickyState.globalSticky,
    globalChecked: stickyState.globalChecked,
    setLocalSticky: stickyState.setLocalSticky,
    onGlobalChange: stickyState.onGlobalChange,
    canShowLocal: stickyState.canShowLocal,
    canShowGlobal: stickyState.canShowGlobal,
    texts: stickyState.texts
  }

  return (
    <Popover
      ref={popoverRef}
      showArrow
      offset={-10}
      popup={() => (
        <DiyTableModal
          diyGroupSorting={diyGroupSorting}
          columns={columns}
          onSave={onSave}
          onCancel={onCancel}
          stickyControlProps={stickyControlPropsRef.current}
          onResetDefault={onResetDefault}
        />
      )}
    >
      <div className='table-icon'>
        <OperationIconTip tip={getLocale('表头设置')}>
          <div>
            <SVGSetting className='gm-cursor gm-text-hover-primary' />
          </div>
        </OperationIconTip>
      </div>
    </Popover>
  )
}

DiySettingHeader.propTypes = {
  popoverRef: PropTypes.any,
  diyGroupSorting: PropTypes.array,
  columns: PropTypes.array,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  stickyHookProps: PropTypes.object,
  onResetDefault: PropTypes.func
}

/**
 * 生成新的columns
 * @param initColumns 初始columns
 * @param mixColumns 需要混合的columns(优先取值)
 * @returns {Array}
 */
function generateDiyColumns(initColumns, mixColumns) {
  const [notDiyCols, diyCols] = splitColumns(initColumns)
  const mixColumnsMap = {}
  _.forEach(mixColumns, (item, index) => {
    item.sortNumber =
      item.diySortNumber !== undefined ? item.diySortNumber : index
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
      // 同步 diySortNumber：下游 (sortedDiyCols / DiyTableModal showCols) 统一按 diySortNumber 排序
      // 否则 newColumn.diySortNumber 来自 props.columns 原始定义（通常 undefined），拖拽顺序无法回显
      newColumn.diySortNumber = localItem.sortNumber
    }
    return newColumn
  })

  diyColumns = _.sortBy(diyColumns, function(o) {
    return o.sortNumber
  })

  return [notDiyCols, diyColumns]
}

function getStorageColumns(columns) {
  // 过滤多余数据，避免复杂数据出现JSON循环引用报错问题
  return _.map(columns, col => {
    const { key, show, diyEnable, diySortNumber } = col
    return { key, show, diyEnable, diySortNumber }
  })
}

// 列宽持久化 storage 后缀，与字段配置 ${id} 隔离
const COL_WIDTH_SUFFIX = '_col_width'

// react-table-v6 的 resized 数组 [{id, value}] <-> storage 扁平结构 {id: value} 互转
function widthMapToResized(widthMap) {
  return _.map(widthMap, (value, id) => ({ id, value: +value }))
}

function resizedToWidthMap(resized) {
  return _.reduce(
    resized,
    (acc, item) => {
      acc[item.id] = item.value
      return acc
    },
    {}
  )
}

function splitColumns(columns) {
  const notDiyCols = []
  const diyCols = []
  for (const item of columns) {
    if (['__selector', '__expander'].includes(item.id)) {
      notDiyCols.push(item)
    } else {
      diyCols.push(item)
    }
  }
  return [notDiyCols, diyCols]
}

function diyTableHOC(Component) {
  // 分组表格才有表头吸顶（是否固定/一键固定）；普通 Table 不响应
  const StickyComponent = withTableSticky(Component, {
    configKey: 'tableConfig',
    stickyClassName: 'gm-react-table-header-sticky'
  })

  class DiyTable extends React.Component {
    popoverRef = createRef()
    constructor(props) {
      super(props)
      // 没有id强制报错
      devWarn(() => {
        if (props.id === undefined) throw Error('diy 必须要有id!')
      })

      // 从localStorage拿到columns
      const localColumns = Storage.get(props.id) || []

      const [notDiyCols, diyCols] = generateDiyColumns(
        props.columns,
        localColumns
      )

      this.notDiyCols = notDiyCols

      // 从 localStorage 读取列宽配置，初始化 react-table-v6 受控 resized 数组
      // 仅当 enableColumnWidthPersist 开启时才恢复持久化的列宽
      let initialResized = []
      if (props.enableColumnWidthPersist) {
        try {
          const localWidthMap = Storage.get(props.id + COL_WIDTH_SUFFIX) || {}
          initialResized = widthMapToResized(localWidthMap)
        } catch (e) {
          // storage 异常时降级为默认列宽，不阻塞渲染
          initialResized = []
        }
      }

      this.state = {
        columns: diyCols,
        resized: initialResized,
        dialogKey: 0,
        tableKey: 0
      }

      // 检测,如果不符合,警告调用方
      devWarn(() => {
        _.each(props.columns, column => {
          const key = getColumnKey(column)
          if (key && !['__selector', '__expander'].includes(column.id)) {
            if (!_.isString(column.Header) && !column.diyItemText) {
              console.error('column need diyItemText', column)
            }
            if (!column.diyGroupName) {
              console.error('column need diyGroupName', column)
            }
          }
        })
      })
    }

    static getDerivedStateFromProps(props, state) {
      return {
        columns: generateDiyColumns(props.columns, state.columns)[1]
      }
    }

    handleColumnsSave = newColumns => {
      this.setState({
        columns: newColumns,
        dialogKey: this.state.dialogKey + 1
      })
      Storage.set(this.props.id, getStorageColumns(newColumns))
    }

    handleResizedChange = newResized => {
      this.setState({ resized: newResized })
      if (this.props.enableColumnWidthPersist) {
        this.persistColumnWidth(newResized)
      }
    }

    persistColumnWidth = _.debounce(resized => {
      try {
        Storage.set(
          this.props.id + COL_WIDTH_SUFFIX,
          resizedToWidthMap(resized)
        )
      } catch (e) {
        // storage 写入失败（配额超限/隐私模式）降级为内存生效，不阻塞拖拽
        console.warn('[diyTableHOC] persist column width failed', e)
      }
    }, 300)

    handleResetDefault = () => {
      Storage.remove(this.props.id)
      if (this.props.enableColumnWidthPersist) {
        Storage.remove(this.props.id + COL_WIDTH_SUFFIX)
      }
      // 取消可能正在等待执行的列宽持久化防抖，避免清除后又被旧数据覆盖
      this.persistColumnWidth.cancel()
      const [, diyCols] = generateDiyColumns(this.props.columns, [])
      this.setState({
        columns: diyCols,
        resized: [],
        dialogKey: this.state.dialogKey + 1,
        // 递增 tableKey 强制 ReactTable 完整重挂载，确保列宽回到自适应默认值
        // react-table-v6 的 componentWillReceiveProps 在仅 resized 变化时不触发 setStateWithData，
        // 单纯传递 resized=[] 无法清除内部缓存的旧列宽，需要 key 变化触发完整重新初始化
        tableKey: this.state.tableKey + 1
      })
    }

    handleCancel = () => {
      this.popoverRef.current.apiDoSetActive(false)
    }

    render() {
      const { columns, resized } = this.state
      const { showColumnBorder, ...passProps } = this.props

      // 将用户拖拽过的列宽注入到 diy 列定义，触发 react-table-v6 重新渲染
      // 同时为所有列注入 minWidth 兜底值，避免 base.js processItem 将 minWidth 强制置为 undefined
      // 导致拖拽时无下限约束
      const sortedDiyCols = _.sortBy(columns, 'diySortNumber').map(col => {
        const key = getColumnKey(col)
        if (!key) return col
        const resizedItem = _.find(resized, r => r.id === key)
        const baseMinWidth = col.minWidth !== undefined ? col.minWidth : 48
        if (!resizedItem) {
          return { ...col, minWidth: baseMinWidth }
        }
        return {
          ...col,
          width: resizedItem.value,
          minWidth: baseMinWidth
        }
      })

      // 弹窗左侧"可选字段"需保持定义顺序不变，而 state.columns 已按 diySortNumber 排序，
      // 因此用 props.columns 的定义顺序重建弹窗用的 columns 数组
      const stateColumnMap = _.keyBy(columns, col => getColumnKey(col))
      const dialogColumns = _.compact(
        _.map(this.props.columns, propCol => {
          const key = getColumnKey(propCol)
          if (!key) return null
          return stateColumnMap[key] || null
        })
      )

      return (
        <StickyComponent
          key={this.state.tableKey}
          {...passProps}
          className={classNames(
            passProps.className,
            showColumnBorder && 'gm-react-table-show-column-border'
          )}
          columns={[
            {
              Header: () => (
                <DiySettingHeader
                  popoverRef={this.popoverRef}
                  diyGroupSorting={this.props.diyGroupSorting}
                  columns={dialogColumns}
                  onSave={this.handleColumnsSave}
                  onCancel={this.handleCancel}
                  onResetDefault={this.handleResetDefault}
                  stickyHookProps={{
                    id: this.props.id,
                    stickyId: this.props.stickyId,
                    sticky: this.props.sticky,
                    defaultSticky: this.props.defaultSticky,
                    onStickyChange: this.props.onStickyChange,
                    showLocalSticky: this.props.showLocalSticky,
                    showGlobalSticky: this.props.showGlobalSticky,
                    localStickyText: this.props.localStickyText,
                    globalStickyText: this.props.globalStickyText
                  }}
                />
              ),
              className: 'icon-column',
              headerClassName: 'icon-column',
              width: referOfWidth.noCell,
              accessor: '_setting', // 不重要,随便写
              id: '__setting', // 不重要,随便写
              fixed: 'left', // 改为默认固定
              resizable: false,
              Cell: () => null // 只是用来占据空间
            },
            ...this.notDiyCols,
            ...sortedDiyCols
          ]}
          resizable
          resized={resized}
          onResizedChange={this.handleResizedChange}
        />
      )
    }
  }

  DiyTable.propTypes = {
    id: PropTypes.string.isRequired,
    /** 是否持久化列宽到 localStorage，默认开启 */
    enableColumnWidthPersist: PropTypes.bool,
    /** 是否显示列表边框 */
    showColumnBorder: PropTypes.bool,
    /** 分组排序 */
    diyGroupSorting: PropTypes.array.isRequired,
    ...Table.propTypes
  }

  DiyTable.defaultProps = {
    showColumnBorder: true,
    enableColumnWidthPersist: true
  }

  return DiyTable
}

export default diyTableHOC
