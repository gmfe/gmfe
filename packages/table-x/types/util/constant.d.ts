type TABLE_X_KEY =
  | 'HEIGHT_HEAD_TR'
  | 'HEIGHT_TR'
  | 'WIDTH_FUN'
  | 'WIDTH_NO'
  | 'WIDTH_OPERATION'
  | 'WIDTH_SEARCH'
  | 'WIDTH_NUMBER'
  | 'WIDTH_SELECT'
  | 'WIDTH_DATE'

declare const TABLE_X: { [key in TABLE_X_KEY]: number }
export default TABLE_X
