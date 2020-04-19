import { PaginationDataOptions } from './types'
import getIndex from './get_index'

function getInfo(data: Required<PaginationDataOptions>) {
  const index = getIndex(data)
  const all = Math.ceil(data.count / data.limit)

  const diff = 2
  let pages: number[] = []

  let begin = Math.max(index - diff, 1)
  let end = Math.min(index + diff, all)

  if (all > diff * 2 + 1) {
    if (begin === 1) {
      end = diff * 2 + 1
    } else if (end === all) {
      begin = Math.max(end - 2 * diff, 1)
    }
  }

  for (let i = begin; i <= end; i++) {
    pages.push(i)
  }

  // 如果总数为 0，还是要给页码加个 1
  if (data.count === 0) {
    pages = [1]
  }
  return { index, all, begin, end, pages }
}

export default getInfo
