import { PaginationDataOptions } from './types'

function getIndex(data: PaginationDataOptions): number {
  return data.offset / data.limit + 1
}

export default getIndex
