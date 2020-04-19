import { TreeV2DataOptions } from '../types'
import listToFlat from './list_to_flat'

function getLeafValues<T>(list: TreeV2DataOptions<T>[]): T[] {
  const flat = listToFlat(
    list,
    (item) => !item.children,
    () => true
  )
  return flat.map((item) => item.data.value)
}

export default getLeafValues
