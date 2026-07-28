import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import TableX from '../../base'
import { TABLE_X, TABLE_X_SELECT_ID } from '../../util'
import { Flex } from '@gmfe/react'
import { devWarn } from '@gm-common/tool'
import { SelectContext } from './util'
import SelectHeader from './header'
import SelectCell from './cell'
import _ from 'lodash'

// 利用 Context 做到按需更新

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

    const canSelectData = data.filter(row => !isSelectorDisable(row))

    // 支持跨页累积勾选：判断当前页每一行是否都在 selected 中，而非依赖 length 比较
    const selectedSet = new Set(selected)
    const isSelectAll =
      canSelectData.length > 0 && canSelectData.every(row => selectedSet.has(row[keyField]))

    const handleSelect = selected => {
      onSelect(selected)
    }

    const handleSelectAll = () => {
      // 支持跨页累积勾选：全选 = 合并当前页；取消全选 = 从 selected 移除当前页
      const currentPageKeys = _.map(canSelectData, v => v[keyField])
      const selectedSet = new Set(selected)
      if (!isSelectAll) {
        currentPageKeys.forEach(key => selectedSet.add(key))
      } else {
        currentPageKeys.forEach(key => selectedSet.delete(key))
      }
      onSelect(Array.from(selectedSet))
    }

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

    return (
      <SelectContext.Provider
        value={{
          selected,
          onSelect: handleSelect,
          isSelectAll,
          onSelectAll: handleSelectAll
        }}
      >
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
      </SelectContext.Provider>
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
