import { TreeV2DataOptions } from '../types'
import { filterGroupListLeaf } from '../../../common/util'

function selectedValues2SelectedList<T>(list: TreeV2DataOptions<T>[], selectedValues: T[]) {
  return filterGroupListLeaf(list, (v) => selectedValues.includes(v.value))
}

export default selectedValues2SelectedList
