import React from 'react'
import PropTypes from 'prop-types'
import baseSelectTableHoc from './select_table_base'
import Table from '../../table'

function selectTableV2HOC(Component) {
  // 先包一层 hocSelectTable
  const SelectComponent = baseSelectTableHoc(Component)

  class SelectTable extends React.Component {
    handleSelect = selected => {
      this.props.onSelect(selected)
    }

    handleSelectAll = isSelectedAll => {
      this.props.onSelectAll(isSelectedAll)
    }

    render() {
      const { batchActionBar, selectType, ...rest } = this.props

      return (
        <div className='gm-react-table-select'>
          {/* 批量条放表格前，才能在吸顶时 sticky；未吸顶仍靠 absolute 上浮 */}
          {batchActionBar}
          <SelectComponent
            {...rest}
            selectType={selectType}
            onSelect={this.handleSelect}
            onSelectAll={this.handleSelectAll}
          />
        </div>
      )
    }
  }

  SelectTable.propTypes = {
    ...Table.propTypes,

    /** 选择类型 */
    selectType: PropTypes.oneOf(['checkbox', 'ratio']),
    /** 被选中项数组[keyField] */
    selected: PropTypes.array.isRequired,
    /** 选中一行的回调 */
    onSelect: PropTypes.func.isRequired,
    /** 选中所有行的回调 */
    onSelectAll: PropTypes.func.isRequired,
    /** 每一行的 checkBox 或 radio 的disable设置函数 */
    isSelectorDisable: PropTypes.func,
    /** 自定义批量操作栏 */
    batchActionBar: PropTypes.element,
    /** 自定义被选中项的id */
    keyField: PropTypes.string
  }

  SelectTable.defaultProps = {
    keyField: 'value',
    selectType: 'checkbox'
  }

  return SelectTable
}

export default selectTableV2HOC
