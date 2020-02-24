import { getLocale } from '@gmfe/locales'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import { getLeafValues, getUnLeafValues, filterWithQuery } from './util'
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
  ...rest
}) => {
  const refList = useRef(null)
  const [listHeight, setListHeight] = useState(null)

  const [query, setQuery] = useState('')
  const [delayQuery, setDelayQuery] = useState('')
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

  const handleSelectAll = checked => {
    onSelectValues(checked ? getLeafValues(list) : [])
  }

  const handleQuery = e => {
    const query = e.target.value
    setQuery(query)

    // 延迟更新 delayQuery
    refDebounce.current(query)
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
      <div className='gm-flex-flex' ref={refList}>
        {!!listHeight && (
          <List
            list={filterList}
            listHeight={listHeight}
            groupSelected={newGS}
            onGroupSelect={handleGroupSelect}
            selectedValues={selectedValues}
            onSelectValues={onSelectValues}
            renderLeafItem={renderLeafItem}
            renderGroupItem={renderGroupItem}
          />
        )}
      </div>

      <Bottom
        list={list}
        selectedValues={selectedValues}
        onChange={handleSelectAll}
      />
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

  title: PropTypes.string,
  /** 过滤函数，默认自带，不需要就 false */
  withFilter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  renderLeafItem: PropTypes.func,
  renderGroupItem: PropTypes.func,
  placeholder: PropTypes.string,

  className: PropTypes.string,
  style: PropTypes.object
}

TreeV2.defaultProps = {
  withFilter: true,
  placeholder: getLocale('搜索')
}

export default TreeV2
