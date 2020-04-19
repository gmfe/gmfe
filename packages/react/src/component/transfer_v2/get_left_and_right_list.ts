import { TreeV2DataOptions } from '../tree_v2'
import { filterGroupListLeaf } from '../../common/util'

function getLeftAndRightList<T>(
  list: TreeV2DataOptions<T>[],
  selectedValues: T[],
  rightTree: boolean
) {
  let rightList: TreeV2DataOptions<T>[] = []
  const leftList: TreeV2DataOptions<T>[] = filterGroupListLeaf(list, (item) => {
    const isRight = selectedValues.includes(item.value)
    if (isRight) {
      rightList.push(item)
    }
    return !isRight
  })

  if (rightTree) {
    rightList = filterGroupListLeaf(list, (item) => selectedValues.includes(item.value))
  }
  return { leftList, rightList }
}

export default getLeftAndRightList
