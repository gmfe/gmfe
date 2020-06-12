import _ from 'lodash'

/**
 * 返回经过predicate筛选后的树
 * @param list 树状数组
 * @param predicate 断言
 * @param isPredicateParentNode 是否处理父节点，默认开启。若进行取反过滤时，要关闭
 * @return {array}
 */
export function filterGroupListLeaf(
  list,
  predicate,
  isPredicateParentNode = true
) {
  return _.filter(
    _.map(list, item => {
      const copy = Object.assign({}, item)
      // 若节点符合过滤条件，直接返回
      if (isPredicateParentNode && predicate(copy)) return copy
      if (copy.children) {
        copy.children = filterGroupListLeaf(
          copy.children,
          predicate,
          isPredicateParentNode
        )
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
