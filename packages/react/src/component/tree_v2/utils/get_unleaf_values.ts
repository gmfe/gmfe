import { TreeV2DataOptions } from '../types'
import listToFlat from './list_to_flat'

function getUnLeafValues<T>(list: TreeV2DataOptions<T>[]) {
  const flat = listToFlat(
    list,
    (item) => !!item.children,
    () => true
  )
  return flat.map((item) => item.data.value)
}

export default getUnLeafValues
