import { TreeV2DataOptions } from '../types'
import filterWithQuery from './filter_with_query'

function getFilterList<T>(
  list: TreeV2DataOptions<T>[],
  query: string,
  withFilter:
    | ((list: TreeV2DataOptions<T>[], query: string) => TreeV2DataOptions<T>[])
    | boolean
) {
  if (!query) {
    return list
  }
  return filterWithQuery(list, query, withFilter)
}

export default getFilterList
