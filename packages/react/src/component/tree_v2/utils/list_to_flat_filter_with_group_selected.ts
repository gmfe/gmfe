import { TreeV2DataOptions } from '../types'
import listToFlat from './list_to_flat'

function listToFlatFilterWithGroupSelected<T>(list: TreeV2DataOptions<T>[], groupSelected: T[]) {
  return listToFlat(
    list,
    () => true,
    (item) => groupSelected.includes(item.value)
  )
}

export default listToFlatFilterWithGroupSelected
