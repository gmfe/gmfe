import _ from 'lodash'

/**
 * 筛选叶子节点，返回满足predicate条件的树
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

/**
 * 筛选所有节点，返回满足predicate条件的树
 * @param list 树状数组
 * @param predicate 断言
 * @return {array}
 */
export function filterGroupListNode(list, predicate) {
  return _.filter(
    _.map(list, item => {
      const copy = Object.assign({}, item)
      if (predicate(copy)) return copy
      if (copy.children) {
        copy.children = filterGroupListNode(copy.children, predicate)
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
