interface FilterGroupListNodeOptions {
  value: any
  text: string
  disabled?: boolean
  children?: FilterGroupListNodeOptions[]
  [key: string]: any
}

interface FilterGroupListNode {
  (
    /* 树状数组 */
    list: FilterGroupListNodeOptions[],
    /* 判断方法 */
    predicate: (item: FilterGroupListNodeOptions) => boolean
  ): FilterGroupListNodeOptions[]
}

/**
 * 筛选所有节点，满足返回 predicate 条件的树
 */
const filterGroupListNode: FilterGroupListNode = (list, predicate) => {
  return list
    .map((item) => {
      const copy = Object.assign({}, item)
      if (predicate(copy)) return copy
      if (copy.children) {
        copy.children = filterGroupListNode(copy.children, predicate)
      }
      return copy
    })
    .filter((item) => {
      if (item.children) {
        return !!item.children.length
      } else {
        return predicate(item)
      }
    })
}

export default filterGroupListNode
