import React, { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import TableX from '../../base'
import { TABLE_X, TABLE_X_SELECT_ID } from '../../util'
import { Flex } from '@gmfe/react'
import { devWarn } from '@gm-common/tool'
import { SelectedSetContext, SelectOperationContext } from './util'
import SelectHeader from './header'
import SelectCell from './cell'
import _ from 'lodash'

function getNewColumns(
  columns,
  fixedSelect,
  selectType,
  keyField,
  isSelectorDisable
) {
  return [
    {
      id: TABLE_X_SELECT_ID,
      width: TABLE_X.WIDTH_FUN,
      maxWidth: TABLE_X.WIDTH_FUN,
      thClassName: 'gm-table-x-icon',
      tdClassName: 'gm-table-x-icon',
      fixed: fixedSelect ? 'left' : null,
      Header: () => <SelectHeader selectType={selectType} />,
      // eslint-disable-next-line
      Cell: ({ row }) => (
        <SelectCell
          selectType={selectType}
          keyField={keyField}
          row={row}
          isSelectorDisable={isSelectorDisable}
        />
      )
    }
  ].concat(columns)
}

function selectTableXHOC(Component) {
  const SelectTableX = props => {
    const {
      selected,
      onSelect,
      batchActionBar,
      isSelectorDisable,
      selectType,
      keyField,
      fixedSelect,
      columns,
      data,
      ...rest
    } = props

    devWarn(() => {
      if (props.onSelectAll) {
        throw Error('onSelectAll已经废弃，使用onSelect即可！')
      }
    })

    const canSelectData = useMemo(
      () => data.filter(row => !isSelectorDisable(row)),
      [data, isSelectorDisable]
    )

    // 勾选集合 Set：引用仅在内容变化时更新（由 useMemo(selected) 保证），
    // 配合 SelectCell 的 memo，勾选任意行时其余行的勾选单元格全部跳过重渲染
    const selectedSet = useMemo(() => new Set(selected), [selected])

    // 支持跨页累积勾选：判断当前页每一行是否都在 selected 中，而非依赖 length 比较
    const isSelectAll =
      canSelectData.length > 0 &&
      canSelectData.every(row => selectedSet.has(row[keyField]))

    // 稳定引用的快照：供「引用不变的回调闭包」在调用时读取最新值，
    // 避免 context value memo 化后消费者持有过期闭包（isSelectAll/canSelectData 过期会导致全选反转）
    const latestRef = useRef({})
    latestRef.current.selectedSet = selectedSet
    latestRef.current.canSelectData = canSelectData
    latestRef.current.isSelectAll = isSelectAll

    const handleSelect = selected => {
      onSelect(selected)
    }

    const handleSelectAll = () => {
      // 支持跨页累积勾选：全选 = 合并当前页；取消全选 = 从 selected 移除当前页
      // 读取调用时刻的最新快照，而非闭包捕获的渲染期值
      const { canSelectData, isSelectAll } = latestRef.current
      const currentPageKeys = _.map(canSelectData, v => v[keyField])
      const nextSet = new Set(latestRef.current.selectedSet)
      if (!isSelectAll) {
        currentPageKeys.forEach(key => nextSet.add(key))
      } else {
        currentPageKeys.forEach(key => nextSet.delete(key))
      }
      onSelect(Array.from(nextSet))
    }

    // 操作回调保持引用稳定：SelectOperationContext 的 value 不因勾选而更新
    const operationValue = useRef({ onSelect: handleSelect, onSelectAll: handleSelectAll })
    operationValue.current.onSelect = handleSelect
    operationValue.current.onSelectAll = handleSelectAll

    // columns 即可，其他都是死的。 isSelectorDisable 呢？
    const newColumns = useMemo(() => {
      return getNewColumns(
        columns,
        fixedSelect,
        selectType,
        keyField,
        isSelectorDisable
      )
    }, [columns])

    // 选中集合 context value：memo 化，避免 SelectTableX 任意重渲染
    // （如页面其他 state 变化）把 context 传播给全部 SelectCell。
    // 注意：value 引用仅在 selectedSet/isSelectAll 变化时更新。
    const selectedSetValue = useMemo(
      () => ({ selectedSet, isSelectAll }),
      [selectedSet, isSelectAll]
    )

    return (
      <SelectOperationContext.Provider value={operationValue.current}>
        <SelectedSetContext.Provider value={selectedSetValue}>
          <div className='gm-table-x-select-container'>
            {batchActionBar && (
              <div className='gm-table-x-select-batch-action-bar-container'>
                <Flex
                  column
                  justifyCenter
                  className='gm-table-x-select-batch-action-bar'
                >
                  {batchActionBar}
                </Flex>
              </div>
            )}
            <Component {...rest} columns={newColumns} data={data} />
          </div>
        </SelectedSetContext.Provider>
      </SelectOperationContext.Provider>
    )
  }

  SelectTableX.propTypes = {
    ...TableX.propTypes,

    // select 专有
    selected: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    batchActionBar: PropTypes.element,
    isSelectorDisable: PropTypes.func,
    selectType: PropTypes.oneOf(['checkbox', 'radio']),
    keyField: PropTypes.string,
    fixedSelect: PropTypes.bool
  }

  SelectTableX.defaultProps = {
    selectType: 'checkbox',
    keyField: 'value',
    isSelectorDisable: () => false
  }

  return SelectTableX
}

export default selectTableXHOC
