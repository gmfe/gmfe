import _ from 'lodash'
import { TreeV2DataOptions } from '../types'
import listToFlat from './list_to_flat'

function getFindGroupSelected<T>(list: TreeV2DataOptions<T>[], findList: TreeV2DataOptions<T>[]) {
  const flat = listToFlat(
    list,
    () => true,
    () => true
  )
  const findListValue = findList.map((item) => item.value)
  return flat.reduce((previousValue: T[], currentValue) => {
    const same = _.intersection(currentValue.leafValues, findListValue)
    return same.length > 0 ? previousValue.concat(currentValue.data.value) : previousValue
  }, [])
}

export default getFindGroupSelected
