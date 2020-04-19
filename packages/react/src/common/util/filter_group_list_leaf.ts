interface FilterGroupListOptions {
  value: any
  text: string
  disabled?: boolean
  children?: FilterGroupListOptions[]
  [key: string]: any
}

interface FilterGroupListLeaf {
  (
    /* 树状数组 */
    list: FilterGroupListOptions[],
    /* 判断方法 */
    predicate: (item: FilterGroupListOptions) => boolean
  ): FilterGroupListOptions[]
}

/**
 * 筛选叶子结点，返回满足 predicate 筛选后的数
 */
const filterGroupListLeaf: FilterGroupListLeaf = (list, predicate) =>
  list
    .map((item) => {
      const copy = Object.assign({}, item)
      if (copy.children) {
        copy.children = filterGroupListLeaf(copy.children, predicate)
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

export default filterGroupListLeaf
