import { pinYinFilter } from '@gm-common/tool'
import { TreeV2DataOptions } from '../types'
import { filterGroupListNode } from '../../../common/util'

const cache: { [key: string]: boolean } = {}

function filterWithQuery<T>(
  list: TreeV2DataOptions<T>[],
  query: string,
  withFilter:
    | ((list: TreeV2DataOptions<T>[], query: string) => TreeV2DataOptions<T>[])
    | boolean
) {
  let processList: TreeV2DataOptions<T>[]
  if (withFilter === true) {
    processList = filterGroupListNode(list, (value) => {
      const field = `${query}______${value.text}`
      if (cache[field] === undefined) {
        cache[field] = !!pinYinFilter(
          [value],
          query,
          (v) => (v as TreeV2DataOptions<T>).text
        ).length
      }
      return cache[field]
    })
  } else if (withFilter) {
    processList = withFilter(list, query)
  } else {
    processList = list
  }
  return processList
}
export default filterWithQuery
