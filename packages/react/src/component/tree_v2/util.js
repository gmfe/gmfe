import _ from 'lodash'
import { pinYinFilter } from 'gm-util'

// 过滤整个 list 的 leaf，predicate 提供断言
function filterGroupListLeaf(list, predicate) {
  return _.filter(list, function(d) {
    if (d.children) {
      d.children = filterGroupListLeaf(d.children, predicate)
    }

    if (d.children) {
      return !!d.children.length
    } else {
      return predicate(d)
    }
  })
}

function filterGroupList(list, predicate) {
  return filterGroupListLeaf(_.cloneDeep(list), predicate)
}

// 这里做一层 cache
const _cache = []
const filterWithQuery = (list, query, withFilter) => {
  let processList
  if (withFilter === true) {
    processList = filterGroupList(list, v => {
      const field = `${query}______${v.text}`
      if (_cache[field] === undefined) {
        _cache[field] = pinYinFilter([v], query, v => v.text).length > 0
      }

      return _cache[field]
    })
  } else if (withFilter) {
    processList = withFilter(list, query)
  } else {
    processList = list
  }

  return processList
}

// 把 list 打平，并附加额外数据 isLeaf level 辅助
function listToFlat(
  list,
  pushCondition,
  childrenCondition,
  result = [],
  level = 0
) {
  _.each(list, item => {
    if (pushCondition(item)) {
      result.push({
        isLeaf: !item.children,
        level,
        data: item
      })
    }

    if (childrenCondition(item)) {
      listToFlat(
        item.children,
        pushCondition,
        childrenCondition,
        result,
        level + 1
      )
    }
  })

  return result
}

function listToFlatFilterWithGroupSelected(list, groupSelected) {
  return listToFlat(
    list,
    () => true,
    item => {
      return groupSelected.includes(item.value)
    }
  )
}

function getUnLeafValues(list) {
  const flat = listToFlat(
    list,
    item => !!item.children,
    () => true
  )

  return _.map(flat, item => item.data.value)
}

function getLeafValues(list) {
  const flat = listToFlat(
    list,
    item => !item.children,
    () => true
  )

  return _.map(flat, item => item.data.value)
}

// 用find，高效。深度遍历，找到存在没选的就终止遍历。
function unSelectAll(list, selectedValues) {
  const unSelected = _.find(list, item => {
    if (item.children) {
      return unSelectAll(item.children, selectedValues)
    } else {
      return !selectedValues.includes(item.value)
    }
  })

  return !!unSelected
}

export {
  getUnLeafValues,
  getLeafValues,
  filterGroupList,
  filterWithQuery,
  listToFlatFilterWithGroupSelected,
  unSelectAll
}
