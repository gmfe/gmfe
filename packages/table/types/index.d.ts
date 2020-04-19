import {
  OperationDelete,
  OperationHeader,
  OperationDetail,
  OperationCell,
  OperationIconTip,
  OperationRowEdit,
} from './util/operation'
import SortHeader from './util/sort_header'
import {
  EditButton,
  EditContentInput,
  EditContentInputNumber,
  EditTableOperation,
} from './util/edit'
import BatchActionBar from './util/batch_action_bar'

export { default as Table } from './base'
export { default as subTableHOC } from './hoc/sub_table'
export { default as diyTableHOC } from './hoc/diy_table'
export { default as fixedColumnsTableHOC } from './hoc/fixed_columns_table'
export { default as fixedFirstColumnsTableHOC } from './hoc/fixed_first_columns_table'
export { default as selectTableV2HOC } from './hoc/select_table'
export { default as expandTableHOC } from './hoc/expand_table'

declare const referOfWidth: {
  noCell: number
  operationCell: number
  searchBox: number
  numberInputBox: number
  selectBox: number
  tableSelectBox: number
  levelSelectBox: number
  dateSelectBox: number
}

declare const TableUtil: {
  OperationDelete: typeof OperationDelete
  OperationHeader: typeof OperationHeader
  OperationDetail: typeof OperationDetail
  OperationCell: typeof OperationCell
  OperationIconTip: typeof OperationIconTip
  OperationRowEdit: typeof OperationRowEdit
  SortHeader: typeof SortHeader
  referOfWidth: typeof referOfWidth
  EditButton: typeof EditButton
  EditContentInput: typeof EditContentInput
  EditContentInputNumber: typeof EditContentInputNumber
  EditTableOperation: typeof EditTableOperation
  BatchActionBar: typeof BatchActionBar
}
export { TableUtil }
