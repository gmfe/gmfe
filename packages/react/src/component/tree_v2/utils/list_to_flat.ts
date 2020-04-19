import { TreeV2DataOptions } from '../types'
import getLeafValues from './get_leaf_values'

export interface ListToFlatResultOptions<T> {
  isLeaf: boolean
  level: number
  data: TreeV2DataOptions<T>
  leafValues: T[]
}

/**
 * 把 list 铺平，并添加额外的 isLeaf 和 level 辅助参数
 */
function listToFlat<T>(
  list: TreeV2DataOptions<T>[],
  pushCondition: (value: TreeV2DataOptions<T>) => boolean,
  childrenCondition: (value: TreeV2DataOptions<T>) => boolean,
  result: ListToFlatResultOptions<T>[] = [],
  level = 0
): ListToFlatResultOptions<T>[] {
  list &&
    list.forEach((item) => {
      if (pushCondition(item)) {
        result.push({
          isLeaf: !item.children,
          level,
          data: item,
          leafValues: getLeafValues(item.children ?? []),
        })
      }

      if (childrenCondition(item)) {
        listToFlat(item.children!, pushCondition, childrenCondition, result, level + 1)
      }
    })
  return result
}

export default listToFlat
