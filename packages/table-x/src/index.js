import BaseTableX from './base'
import BaseTableXVirtualized from './base/virtualized'
import withTableSticky from './hoc/with_table_sticky'
import selectTableXHOC from './hoc/select_table_x'
import expandTableXHOC from './hoc/expand_table_x'
import fixedColumnsTableXHOC from './hoc/fixed_columns_table_x'
import sortableTableXHOC from './hoc/sortable_table_x'
import subTableXHOC from './hoc/sub_table_x'
import editTableXHOC from './hoc/edit_table_x'
import diyTableXHOC from './hoc/diy_table_x'

import {
  TABLE_X,
  BatchActionBar,
  OperationHeader,
  OperationDelete,
  OperationRecover,
  OperationDetail,
  OperationCell,
  OperationRowEdit,
  OperationIconTip,
  EditButton,
  EditOperation,
  SortHeader
} from './util'

// 吸顶仅由 diyTableXHOC（分组表格）开启，普通 TableX 不响应「一键固定」
const TableX = BaseTableX
const TableXVirtualized = BaseTableXVirtualized

const TableXUtil = {
  TABLE_X,

  BatchActionBar,
  SortHeader,
  OperationRecover,
  OperationHeader,
  OperationDelete,
  OperationDetail,
  OperationCell,
  OperationRowEdit,
  OperationIconTip,
  EditButton,
  EditOperation
}

export {
  TableXUtil,
  TableX,
  TableXVirtualized,
  selectTableXHOC,
  expandTableXHOC,
  fixedColumnsTableXHOC,
  subTableXHOC,
  editTableXHOC,
  diyTableXHOC,
  sortableTableXHOC
}
