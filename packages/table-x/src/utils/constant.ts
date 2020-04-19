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
  WIDTH_DATE: 110,
}

// 私有。这些默认值都不会被tableX真正使用到，所以就这么定义了。
const __DEFAULT_COLUMN = {
  minWidth: 7.77,
  width: 17.77,
  maxWidth: 1777.77,
}

export {
  TABLE_X_SELECT_ID,
  TABLE_X_EXPAND_ID,
  TABLE_X_DIY_ID,
  TABLE_X,
  TABLE_X_SUB_TABLE_ID,
  __DEFAULT_COLUMN,
}
