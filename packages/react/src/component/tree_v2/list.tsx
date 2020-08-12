import React, {
  FC,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import _ from 'lodash'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { TreeV2DataOptions } from './types'
import { listToFlatFilterWithGroupSelected, getLeafValues, listToFlat } from './utils'
import Item from './item'

interface ListProps<T> {
  list: TreeV2DataOptions<T>[]
  groupSelected: T[]
  onGroupSelect(groupSelected: T[]): void
  selectedValues: T[]
  onSelectValues(selectedValues: T[]): void
  listHeight: number
  renderLeafItem(item: TreeV2DataOptions<T>): ReactNode
  renderGroupItem(item: TreeV2DataOptions<T>): ReactNode
  activeValue?: T
  onActiveValues?(activeValues: T[]): void
  indeterminateList?: T[]
  listRef?: RefObject<FixedSizeList>
}

const List = <T,>({
  list,
  groupSelected,
  onGroupSelect,
  selectedValues,
  onSelectValues,
  listHeight,
  renderLeafItem,
  renderGroupItem,
  onActiveValues,
  indeterminateList,
  activeValue,
  listRef,
}: ListProps<T>) => {
  const [active, setActive] = useState<T>()
  useEffect(() => {
    // 定位时，将定位项设置为 active 项
    const flat = listToFlat(
      list,
      () => true,
      () => true
    )
    const data = flat.filter((item) => item.data.value === activeValue)
    const values = data.length ? getLeafValues([data[0].data]) : []
    onActiveValues && onActiveValues(values)
    setActive(activeValue)
  }, [activeValue, list, onActiveValues])

  const flatList = useMemo(() => listToFlatFilterWithGroupSelected(list, groupSelected), [
    list,
    groupSelected,
  ])

  const handleGroup = useCallback(
    (item: TreeV2DataOptions<T>) => {
      onGroupSelect(_.xor(groupSelected, [item.value]))
    },
    [onGroupSelect, groupSelected]
  )

  const handleSelect = useCallback(
    (item: TreeV2DataOptions<T>, isSelected: boolean) => {
      const values = getLeafValues([item])
      if (isSelected) {
        onSelectValues(_.uniq(selectedValues.concat(values)))
      } else {
        onSelectValues(_.difference(selectedValues, values))
      }
    },
    [onSelectValues, selectedValues]
  )

  const handleActive = useCallback(
    (item: TreeV2DataOptions<T>) => {
      const values = getLeafValues([item])
      setActive(item.value)
      onActiveValues && onActiveValues(values)
    },
    [onActiveValues]
  )

  const Raw: FC<ListChildComponentProps> = ({ index, style }) => {
    const flatItem = flatList[index]
    const isGrouped = groupSelected.includes(flatItem.data.value)

    const selectedLeafValues = _.intersection(selectedValues, flatItem.leafValues)
    const indeterminateLeafValues = _.intersection(
      indeterminateList!,
      flatItem.leafValues
    )

    let isSelected: boolean, isIndeterminate: boolean
    if (flatItem.isLeaf) {
      isSelected = selectedValues.includes(flatItem.data.value)
      isIndeterminate = indeterminateList!.includes(flatItem.data.value)
    } else {
      isSelected =
        flatItem.leafValues.length !== 0 &&
        flatItem.leafValues.length === selectedLeafValues.length
      isIndeterminate =
        (selectedLeafValues.length !== 0 || indeterminateLeafValues.length !== 0) &&
        !isSelected
    }
    return (
      <Item
        key={flatItem.data.value as any}
        isGrouped={isGrouped}
        onGroup={handleGroup}
        isSelected={isSelected}
        isIndeterminate={isIndeterminate}
        onSelect={handleSelect}
        flatItem={flatItem}
        style={style}
        renderLeafItem={renderLeafItem}
        renderGroupItem={renderGroupItem}
        active={flatItem.data.value === active}
        onActive={handleActive}
      />
    )
  }

  return (
    <FixedSizeList
      ref={listRef}
      height={listHeight}
      itemSize={28}
      itemCount={flatList.length}
      width='100%'
    >
      {Raw}
    </FixedSizeList>
  )
}

export default List
