import { getLocale } from '@gmfe/locales'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import Input from '../input'
import Button from '../button'
import Flex from '../flex'
import {
  getLeafValues,
  getUnLeafValues,
  filterWithQuery,
  getItemOffsetHeight
} from './util'
import { filterGroupListLeaf } from '../../common/util'
import _ from 'lodash'
import classNames from 'classnames'
import Bottom from './bottom'
import List from './list'

function getFilterList(list, query, withFilter) {
  if (query === '') {
    return list
  }

  return filterWithQuery(list, query, withFilter)
}

function getGroupSelected(filterList, query) {
  if (query === '') {
    return []
  }

  return getUnLeafValues(filterList)
}

const TreeV2 = ({
  title,
  list,
  selectedValues,
  onSelectValues,
  placeholder,
  withFilter,
  renderLeafItem,
  renderGroupItem,
  className,
  showAllCheck,
  indeterminateList,
  activeValue,
  onActiveValues,
  withFindFilter,
  findPlaceholder,
  ...rest
}) => {
  const refList = useRef(null)
  const refFixedList = useRef(null)
  const refInput = useRef(null)
  const [listHeight, setListHeight] = useState(null)

  // 搜索
  const [query, setQuery] = useState('')
  const [delayQuery, setDelayQuery] = useState('')
  // 定位
  const [findQuery, setFindQuery] = useState('')
  const [findItem, setFindItem] = useState([])
  const [findIndex, setFindIndex] = useState(-1)
  // 区分正常的 展开收起 和 搜索导致的展开收起
  const [groupSelected, setGroupSelected] = useState([])
  // 保存一个函数的引用而已
  const refDebounce = useRef(
    _.debounce(value => {
      setDelayQuery(value)
    }, 300)
  )
  // memo list delayQuery 即可， withFilter 不会变
  const filterList = useMemo(() => {
    return getFilterList(list, delayQuery, withFilter)
  }, [list, delayQuery])

  const queryGroupSelected = useMemo(() => {
    return getGroupSelected(filterList, delayQuery)
  }, [filterList, delayQuery])

  useEffect(() => {
    setListHeight(refList.current.offsetHeight)
  }, [])
  useEffect(() => {
    const scroll_height = findItem[findIndex] ? findItem[findIndex].height : 0
    findItem[findIndex] && handleScroll(scroll_height)
  }, [findIndex])

  const handleSelectAll = checked => {
    onSelectValues(checked ? getLeafValues(list) : [])
  }

  const handleQuery = e => {
    const query = e.target.value
    setQuery(query)

    // 延迟更新 delayQuery
    refDebounce.current(query)
  }

  const handleFindQuery = e => {
    const v = e.target.value
    setFindQuery(v)
    setFindItem([])
    setFindIndex(-1)
  }

  const handleScroll = height => {
    // 全部展开，方便控制scroll
    setGroupSelected(getUnLeafValues(list))
    refFixedList.current.scrollTo(height)
  }

  const handleSearch = () => {
    const find_list = withFindFilter(list, findQuery)
    const box_height = refList.current.offsetHeight
    const scroll_list = _.map(find_list, item => ({
      height: getItemOffsetHeight(item, 28, box_height, list),
      value: item.value
    }))

    if (!find_list || !scroll_list.length) {
      handleScroll(0)
      return
    }
    setFindItem(scroll_list)
    return scroll_list
  }

  const handleNext = async () => {
    const list = handleSearch()
    if (findIndex + 1 === list.length) {
      setFindIndex(0)
    } else {
      setFindIndex(findIndex + 1)
    }
  }

  const handleGroupSelect = groupSelected => {
    setGroupSelected(groupSelected)
  }

  const newGS = query ? queryGroupSelected : groupSelected

  return (
    <Flex {...rest} column className={classNames('gm-tree-v2', className)}>
      {title && (
        <div className='gm-padding-5 gm-back-bg text-center gm-border-bottom'>
          {title}
        </div>
      )}
      {withFilter && (
        <div className='gm-tree-v2-filter'>
          <input
            type='text'
            className='form-control'
            value={query}
            onChange={handleQuery}
            placeholder={placeholder}
          />
        </div>
      )}
      {withFindFilter && (
        <Flex>
          <Input
            ref={refInput}
            placeholder={findPlaceholder}
            onChange={handleFindQuery}
            value={findQuery}
            className='form-control'
          />
          <Button type='primary' onClick={handleNext}>
            {getLocale('定位')}
          </Button>
        </Flex>
      )}
      <div className='gm-flex-flex' ref={refList}>
        {!!listHeight && (
          <List
            listRef={refFixedList}
            list={filterList}
            listHeight={listHeight}
            groupSelected={newGS}
            onGroupSelect={handleGroupSelect}
            selectedValues={selectedValues}
            onSelectValues={onSelectValues}
            renderLeafItem={renderLeafItem}
            renderGroupItem={renderGroupItem}
            onActiveValues={onActiveValues}
            indeterminateList={indeterminateList}
            activeValue={
              findItem[findIndex] ? findItem[findIndex].value : activeValue
            }
          />
        )}
      </div>

      {showAllCheck ? (
        <Bottom
          list={list}
          selectedValues={selectedValues}
          onChange={handleSelectAll}
        />
      ) : null}
    </Flex>
  )
}

// 哎呀，暴露了两个方法出去，请小心
TreeV2.filterGroupList = filterGroupListLeaf
TreeV2.selectedValues2SelectedList = (list, selectValues) => {
  const selectedList = filterGroupListLeaf(list, v =>
    selectValues.includes(v.value)
  )

  return selectedList
}

TreeV2.propTypes = {
  /** [{value, name, children: []}] */
  list: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onSelectValues: PropTypes.func.isRequired,
  onActiveValues: PropTypes.func,
  activeValue: PropTypes.string,

  title: PropTypes.string,
  /** 过滤函数，默认自带，不需要就 false */
  withFilter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  renderLeafItem: PropTypes.func,
  renderGroupItem: PropTypes.func,
  placeholder: PropTypes.string,
  /** 全选开关是否显示 */
  showAllCheck: PropTypes.bool,
  /** 半勾选状态，数组 [value] */
  indeterminateList: PropTypes.array,
  /** 定位过滤函数, 默认自带，不需要就 false */
  withFindFilter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  findPlaceholder: PropTypes.string,

  className: PropTypes.string,
  style: PropTypes.object
}

TreeV2.defaultProps = {
  withFilter: true,
  withFindFilter: false,
  showAllCheck: true,
  activeValue: null,
  placeholder: getLocale('搜索'),
  findPlaceholder: getLocale('输入定位信息'),
  onActiveValues: () => [],
  indeterminateList: []
}

export default TreeV2
