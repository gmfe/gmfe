import _ from 'lodash'
import { TableSelectColumnOptions } from './types'

interface GetColumnKey {
  (column: TableSelectColumnOptions<any>): string | null
}

const getColumnKey: GetColumnKey = (column) => {
  if (_.isString(column.accessor)) {
    return column.accessor
  } else if (_.isFunction(column.accessor) && column.id) {
    return column.id
  } else if (column.id) {
    return column.id
  }
  return null
}

export default getColumnKey
