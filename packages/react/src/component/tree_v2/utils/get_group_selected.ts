import { TreeV2DataOptions } from '../types'
import getUnLeafValues from './get_unleaf_values'

function getGroupSelected<T>(filterList: TreeV2DataOptions<T>[], query: string) {
  if (!query) {
    return []
  }
  return getUnLeafValues(filterList)
}

export default getGroupSelected
