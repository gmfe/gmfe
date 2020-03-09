import _ from 'lodash'
import { pinYinFilter } from '@gm-common/tool'
import { filterGroupListLeaf } from '../../common/util'

// 这里做一层 cache
const _cache = []
const filterWithQuery = (list, query, withFilter) => {
  let processList
  if (withFilter === true) {
    processList = filterGroupListLeaf(list, v => {
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
        data: item,
        leafValues: getLeafValues(item.children || [])
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

/**
 * 获取滚动高度,需要标明虚拟列表每项的高度 itemHeight ,因为用 scrollTo 滚动
 * @param {object} item 搜索项
 * @param {number} itemHeight 虚拟列表中每项的高度
 * @param {number} box_height 容器的高度
 * @param {object} list 搜索的数据
 */
function getItemOffsetHeight(item, itemHeight, box_height, list) {
  const flat = listToFlat(
    list,
    () => true,
    () => true
  )

  let count = 0
  let flatItem = null
  do {
    flatItem = flat[count++]
  } while (flatItem.data.value !== item.value && count !== flat.length)
  // 最大限制高度
  const limit_height = flat.length * itemHeight - box_height
  // 限制高度
  const item_scroll_height =
    (count - 1) * itemHeight < limit_height
      ? (count - 1) * itemHeight
      : limit_height
  return item_scroll_height
}

export {
  getUnLeafValues,
  getLeafValues,
  filterWithQuery,
  listToFlatFilterWithGroupSelected,
  unSelectAll,
  getItemOffsetHeight,
  listToFlat
}
