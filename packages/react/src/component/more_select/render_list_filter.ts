import { pinYinFilter } from '@gm-common/tool'
import { MoreSelectBaseDataOptions, MoreSelectNormalDataOptions } from './types'

function renderListFilterDefault<T>(
  data: MoreSelectBaseDataOptions<T>[],
  query: string
): MoreSelectBaseDataOptions<T>[] {
  const result: MoreSelectBaseDataOptions<T>[] = []
  data.forEach((item) => {
    const list = item.children.filter((child) => child.text.includes(query))
    if (list.length) {
      result.push({ ...item, children: list })
    }
  })
  return result
}

function renderListFilterPinYin<T>(
  data: MoreSelectBaseDataOptions<T>[],
  query: string
): MoreSelectBaseDataOptions<T>[] {
  const result: MoreSelectBaseDataOptions<T>[] = []
  data.forEach((item) => {
    const list = pinYinFilter(
      item.children,
      query,
      (v) => (v as MoreSelectNormalDataOptions<T>).text
    )
    if (list.length) {
      result.push({
        ...item,
        children: list as MoreSelectNormalDataOptions<T>[],
      })
    }
  })
  return result
}

export { renderListFilterDefault, renderListFilterPinYin }
