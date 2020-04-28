import TABLE_X from './util/constant'
import BatchActionBar from './util/batch_action_bar'
import {
  OperationIconTip,
  OperationHeader,
  OperationCell,
  OperationDelete,
  OperationDetail,
  OperationRowEdit,
} from './util/operation'
import SortHeader from './util/sort_header'
import { EditOperation, EditButton } from './util/edit'

export { default as TableX } from './base/base'
export { default as TableXVirtualized } from './base/virtualized'
export { default as selectTableXHOC } from './hoc/select_table_x'
export { default as expandTableXHOC } from './hoc/expand_table_x'
export { default as fixedColumnsTableXHOC } from './hoc/fixed_columns_table_x'
export { default as subTableXHOC } from './hoc/sub_table_x'
export { default as editTableXHOC } from './hoc/edit_table_x'
export { default as diyTableXHOC } from './hoc/diy_table_x'
export { default as sortableTableXHOC } from './hoc/sortable_table_x'

declare const TableXUtil: {
  TABLE_X: typeof TABLE_X
  SortHeader: typeof SortHeader
  BatchActionBar: typeof BatchActionBar
  OperationIconTip: typeof OperationIconTip
  OperationHeader: typeof OperationHeader
  OperationCell: typeof OperationCell
  OperationDelete: typeof OperationDelete
  OperationDetail: typeof OperationDetail
  OperationRowEdit: typeof OperationRowEdit
  EditOperation: typeof EditOperation
  EditButton: typeof EditButton
}

export { TableXUtil }
