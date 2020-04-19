import _ from 'lodash'
import { pinyin } from '@gm-common/tool'
import { CascaderDataOptions, CascaderDataOptionsWithPath, CascaderSelectProps } from './types'

// 原有方法带有 searchText，但是没发现哪里有使用，所以去掉
function mapPath<T>(list: CascaderDataOptionsWithPath<T>[], parentPath: T[] = []) {
  return list.map((item) => {
    const { _path, children, ...rest } = item
    const result: CascaderDataOptionsWithPath<T> = { ...rest }
    if (_.isNil(_path)) {
      result._path = [...parentPath, result.value]
    }
    if (item.children) {
      result.children = mapPath(item.children, [...result._path])
    }
    return result
  })
}

/**
 * 找出 list 数下匹配 searchText 的最深元素的路径
 * @param list
 * @param searchText
 */
function getMaxDeepPathOfMatchElement<T>(
  list: CascaderDataOptionsWithPath<T>[],
  searchText: string
) {
  let maxLengthPath: T[] = []

  function findMaxLengthPath(list: CascaderDataOptionsWithPath<T>[], searchText: string) {
    list.forEach((item) => {
      // 匹配首字母
      const firstLetter = _.map(pinyin(item.name, 'first_letter'), (value) => value[0]).join('')
      // 全拼集合
      const normal = _.map(pinyin(item.name), (value) => value[0]).join('')

      if (
        (item.name.includes(searchText) ||
          normal.includes(searchText) ||
          firstLetter.includes(searchText)) &&
        maxLengthPath.length < item._path!.length
      ) {
        maxLengthPath = item._path!
      }

      if (item.children) {
        findMaxLengthPath(item.children, searchText)
      }
    })
  }

  findMaxLengthPath(list, searchText)

  return maxLengthPath
}

function getPropsSelected<T>(props: CascaderSelectProps<T>): CascaderDataOptions<T>[][] {
  const { multiple, selected } = props
  if (!selected?.length) {
    return []
  }
  return multiple
    ? (selected as CascaderDataOptions<T>[][])
    : [selected as CascaderDataOptions<T>[]]
}

export { mapPath, getMaxDeepPathOfMatchElement, getPropsSelected }
