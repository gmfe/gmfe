import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import _ from 'lodash'
import { FixedSizeList } from 'react-window'
import classNames from 'classnames'
import { TreeV2Props } from './types'
import { Flex } from '../flex'
import { Input } from '../input'
import { Button } from '../button'
import { getLocale } from '@gmfe/locales'
import Bottom from './bottom'
import List from './list'
import {
  getLeafValues,
  getFilterList,
  getGroupSelected,
  getFindGroupSelected,
  getItemOffsetHeight,
  selectedValues2SelectedList,
} from './utils'
import { filterGroupListLeaf } from '../../common/util'

interface TreeV2FC<T = any> extends FC<TreeV2Props<T>> {
  filterGroupList: typeof filterGroupListLeaf
  selectedValues2SelectedList: typeof selectedValues2SelectedList
}

const TreeV2: TreeV2FC = <T,>({
  title,
  list,
  selectedValues,
  onSelectValues,
  placeholder = getLocale('搜索'),
  withFilter = true,
  renderLeafItem = (item) => item.text,
  renderGroupItem = (item) => item.text,
  className,
  showAllCheck = true,
  indeterminateList = [],
  activeValue,
  onActiveValues = () => [],
  withFindFilter,
  findPlaceholder = getLocale('输入定位信息'),
  ...rest
}: TreeV2Props<T>) => {
  const listRef = useRef<HTMLDivElement>(null)
  const fixedListRef = useRef<FixedSizeList>(null)
  const inputRef = useRef(null)
  const [listHeight, setListHeight] = useState<number>()

  // 搜索
  const [query, setQuery] = useState('')
  const [delayQuery, setDelayQuery] = useState('')

  // 定位
  const [findQuery, setFindQuery] = useState('')
  const [findItem, setFindItem] = useState<{ height: number; value: T }[]>([])
  const [findIndex, setFindIndex] = useState(-1)
  // 区分正常的展开收起 和 搜索导致的展开收起
  const [groupSelected, setGroupSelected] = useState<T[]>([])
  // 保存一个函数的引用而已
  const debounceRef = useRef(
    _.debounce((value: string) => {
      setDelayQuery(value)
    }, 300)
  )

  // memo list delayQuery 即可，withFilter 不会变
  const filterList = useMemo(() => getFilterList(list, delayQuery, withFilter), [
    list,
    delayQuery,
  ])
  const queryGroupSelected = useMemo(() => getGroupSelected(filterList, delayQuery), [
    filterList,
    delayQuery,
  ])

  useLayoutEffect(() => {
    setListHeight(listRef.current!.offsetHeight)
  }, [])

  useEffect(() => {
    const scrollHeight = findItem[findIndex] ? findItem[findIndex].height : 0
    findItem[findIndex] && handleScroll(scrollHeight)
  }, [findIndex])

  const handleQuery = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setQuery(query)

    // 延迟更新 delayQuery
    debounceRef.current(query)
  }, [])

  const handleScroll = (height: number): void => {
    fixedListRef.current!.scrollTo(height)
  }

  const handleFindQuery = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFindQuery(value)
    setFindItem([])
    setFindIndex(-1)
  }, [])

  const handleSearch = useCallback(() => {
    if (!withFindFilter) {
      return
    }
    const findList = withFindFilter(list, findQuery)
    const boxHeight = listRef.current!.offsetHeight
    const groupSelected = getFindGroupSelected(list, findList)
    const scrollList = findList.map((item) => ({
      height: getItemOffsetHeight(item, 28, boxHeight, list, groupSelected),
      value: item.value,
    }))

    // 展开定位到的数据
    setGroupSelected(groupSelected)
    if (!findList || !scrollList.length) {
      handleScroll(0)
      return
    }
    setFindItem(scrollList)
    return scrollList
  }, [withFindFilter, list, findQuery])

  const handleNext = useCallback(() => {
    const list = handleSearch()
    if (findIndex + 1 === list?.length) {
      setFindIndex(0)
    } else {
      setFindIndex(findIndex + 1)
    }
  }, [handleSearch, findIndex])

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      onSelectValues(checked ? getLeafValues(list) : [])
    },
    [onSelectValues, list]
  )

  const handleGroupSelect = (groupSelected: T[]): void => {
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
          <Input
            type='text'
            value={query}
            onChange={handleQuery}
            className='form-control'
            placeholder={placeholder}
          />
        </div>
      )}
      {withFindFilter && (
        <Flex>
          <Input
            ref={inputRef}
            type='text'
            value={findQuery}
            onChange={handleFindQuery}
            placeholder={findPlaceholder}
            className='form-control'
          />
          <Button type='primary' onClick={handleNext}>
            {getLocale('定位')}
          </Button>
        </Flex>
      )}
      <div className='gm-flex-flex' ref={listRef}>
        {!!listHeight && (
          <List
            listRef={fixedListRef}
            list={filterList}
            listHeight={listHeight}
            groupSelected={newGS}
            onGroupSelect={handleGroupSelect}
            selectedValues={selectedValues}
            onSelectValues={onSelectValues}
            renderLeafItem={renderLeafItem}
            renderGroupItem={renderGroupItem}
            indeterminateList={indeterminateList}
            onActiveValues={onActiveValues}
            activeValue={findItem[findIndex] ? findItem[findIndex].value : activeValue}
          />
        )}
      </div>
      {showAllCheck && (
        <Bottom list={list} selectedValues={selectedValues} onChange={handleSelectAll} />
      )}
    </Flex>
  )
}

TreeV2.filterGroupList = filterGroupListLeaf
TreeV2.selectedValues2SelectedList = selectedValues2SelectedList

export default TreeV2
