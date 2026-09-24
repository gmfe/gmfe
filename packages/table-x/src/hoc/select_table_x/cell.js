import { SelectedSetContext, SelectOperationContext } from './util'
import { Checkbox, Radio } from '@gmfe/react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

/**
 * 勾选单元格（性能优化版）：
 * - memo + 自定义比较器：只有「本行 row 引用」变化时才重渲染。
 *   行模型（react-table rows）在 data/columns 引用稳定时跨勾选保持稳定，
 *   因此勾选任意行时其他 199 个 SelectCell 全部跳过渲染。
 * - 勾选态读取：订阅拆分后的 SelectedSetContext（Set 引用仅在集合内容变化时更新，
 *   且 checkbox 受控值由 selectedSet.has(value) 计算，属于本单元格最小订阅面）。
 * - 操作回调：订阅 SelectOperationContext（Provider 保证回调引用稳定，不引发额外渲染）。
 */
const SelectCell = React.memo(
  ({ selectType, keyField, row, isSelectorDisable }) => {
    const value = row.original[keyField]
    const disabled = isSelectorDisable(row.original)

    return (
      <SelectedSetContext.Consumer>
        {({ selectedSet }) => {
          const isChecked = selectedSet.has(value)

          if (selectType === 'checkbox') {
            return (
              <SelectOperationContext.Consumer>
                {({ onSelect }) => (
                  <Checkbox
                    className='gm-table-x-select'
                    disabled={disabled}
                    checked={isChecked}
                    onChange={() => {
                      onSelect(_.xor(Array.from(selectedSet), [value]))
                    }}
                  />
                )}
              </SelectOperationContext.Consumer>
            )
          } else {
            return (
              <SelectOperationContext.Consumer>
                {({ onSelect }) => (
                  <Radio
                    className='gm-table-x-select'
                    disabled={disabled}
                    checked={isChecked}
                    onClick={() => {
                      onSelect(isChecked ? [] : [value])
                    }}
                  />
                )}
              </SelectOperationContext.Consumer>
            )
          }
        }}
      </SelectedSetContext.Consumer>
    )
  },
  // row 引用一致即跳过：行内勾选态变化走 Context 更新，不依赖 props
  (prevProps, nextProps) => prevProps.row === nextProps.row
)

SelectCell.propTypes = {
  selectType: PropTypes.string.isRequired,
  keyField: PropTypes.string.isRequired,
  row: PropTypes.object.isRequired,
  isSelectorDisable: PropTypes.func.isRequired
}

export default SelectCell
