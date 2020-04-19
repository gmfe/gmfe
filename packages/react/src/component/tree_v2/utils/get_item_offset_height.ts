import { TreeV2DataOptions } from '../types'
import listToFlat from './list_to_flat'

function getItemOffsetHeight<T>(
  data: TreeV2DataOptions<T>,
  itemHeight: number,
  boxHeight: number,
  list: TreeV2DataOptions<T>[],
  groupSelected: T[]
) {
  const flat = listToFlat(
    list,
    () => true,
    () => true
  )
  let height = 0
  let flag = false
  // 最大限制高度
  const maxHeight = flat.reduce((previousValue: number, currentValue) => {
    const exist = groupSelected.includes(currentValue.data.value)
    if (currentValue.data.value === data.value) {
      height = previousValue - itemHeight
    }
    if (exist) {
      flag = true
      previousValue += itemHeight
    } else if (!currentValue.isLeaf && flag) {
      flag = false
      previousValue += itemHeight
    } else if (!currentValue.isLeaf && !flag) {
      previousValue += itemHeight
    } else if (currentValue.isLeaf && flag) {
      previousValue += itemHeight
    }
    return previousValue
  }, 0)
  const limitHeight = maxHeight < boxHeight ? 0 : maxHeight - boxHeight
  // 限制高度
  return height < limitHeight ? height : limitHeight
}

export default getItemOffsetHeight
