import { FunctionSetDataOptions } from './type'
import { LevelListDataOptions } from '../level_list'

interface ProcessDataWithValue {
  (data: FunctionSetDataOptions[], map: { [key: string]: any }, pre?: string): LevelListDataOptions<
    string
  >[]
}

const processDataWithValue: ProcessDataWithValue = (data, map, pre = '') => {
  return data.map((item, index) => {
    const value = `${pre}_${index}`
    map[value] = item
    if (item.children) {
      item.children = processDataWithValue(item.children, map, value)
    }
    return { value, ...item } as LevelListDataOptions<string>
  })
}

export { processDataWithValue }
