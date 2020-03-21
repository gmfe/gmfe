import _ from 'lodash'

/**
 * 返回经过predicate筛选后的树
 * @param list 树状数组
 * @param predicate 断言
 * @return {array}
 */
export function filterGroupListLeaf(list, predicate) {
  return _.filter(
    _.map(list, item => {
      const copy = Object.assign({}, item)
      if (copy.children) {
        copy.children = filterGroupListLeaf(copy.children, predicate)
      }
      return copy
    }),
    d => {
      if (d.children) {
        return !!d.children.length
      } else {
        return predicate(d)
      }
    }
  )
}
