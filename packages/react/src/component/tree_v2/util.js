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
 * @param {object} data 搜索项
 * @param {number} itemHeight 虚拟列表中每项的高度
 * @param {number} box_height 容器的高度
 * @param {object} list 搜索的数据
 * @param {object} group_select 已展开的id
 */
function getItemOffsetHeight(data, itemHeight, box_height, list, group_select) {
  const flat = listToFlat(
    list,
    () => true,
    () => true
  )

  let height = 0
  let flag = false
  // 最大限制高度
  const max_height = _.reduce(
    flat,
    (res, item) => {
      const exist = _.includes(group_select, item.data.value)
      if (item.data.value === data.value) {
        height = res - itemHeight
      }

      if (exist) {
        flag = true
        res = res + itemHeight
      } else if (!item.isLeaf && flag) {
        flag = false
        res = res + itemHeight
      } else if (!item.isLeaf && !flag) {
        res = res + itemHeight
      } else if (item.isLeaf && flag) {
        res = res + itemHeight
      }
      return res
    },
    0
  )
  const limit_height = max_height < box_height ? 0 : max_height - box_height
  // 限制高度
  const item_scroll_height = height < limit_height ? height : limit_height
  return item_scroll_height
}

/**
 * getFindGroupSelected 获取定位的展开id
 * @param {object} list 列表到数据
 * @param {object} find_list 搜索的数据
 * @return 对应到树节点到id数组
 */
function getFindGroupSelected(list, find_list) {
  const flat = listToFlat(
    list,
    () => true,
    () => true
  )
  const find_list_value = _.map(find_list, i => i.value)
  return _.reduce(
    flat,
    (res, item) => {
      const same = _.intersection(item.leafValues, find_list_value)
      return same.length > 0 ? _.concat(res, item.data.value) : res
    },
    []
  )
}

export {
  getUnLeafValues,
  getLeafValues,
  filterWithQuery,
  listToFlatFilterWithGroupSelected,
  unSelectAll,
  getItemOffsetHeight,
  listToFlat,
  getFindGroupSelected
}
