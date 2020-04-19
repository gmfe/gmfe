import React, { CSSProperties, MouseEvent, ReactNode, useCallback } from 'react'
import classNames from 'classnames'
import { Flex } from '../flex'
import SVGExpand from '../../../svg/expand.svg'
import SVGCloseup from '../../../svg/closeup.svg'
import { Checkbox } from '../checkbox'
import { TreeV2DataOptions } from './types'

interface ItemProps<T> {
  isGrouped: boolean
  onGroup(item: TreeV2DataOptions<T>, isGrouped: boolean): void
  isSelected: boolean
  isIndeterminate: boolean
  onSelect(item: TreeV2DataOptions<T>, isSelected: boolean): void
  flatItem: {
    isLeaf: boolean
    level: number
    data: TreeV2DataOptions<T>
  }
  style: CSSProperties
  renderLeafItem(item: TreeV2DataOptions<T>): ReactNode
  renderGroupItem(item: TreeV2DataOptions<T>): ReactNode
  onActive(item: TreeV2DataOptions<T>): void
  active: boolean
}

const Item = <T,>({
  isGrouped,
  onGroup,
  isSelected,
  isIndeterminate,
  onSelect,
  flatItem: { isLeaf, level, data },
  style,
  renderLeafItem,
  renderGroupItem,
  active,
  onActive,
}: ItemProps<T>) => {
  const handleGroup = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      onGroup(data, !isGrouped)
    },
    [onGroup, data, isGrouped]
  )

  const handleRadio = useCallback(() => {
    onSelect(data, !isSelected)
  }, [onSelect, data, isSelected])

  const handleActive = useCallback(() => {
    onActive(data)
  }, [onActive, data])

  return (
    <Flex
      alignCenter
      className={classNames('gm-tree-v2-list-item', { active })}
      style={{ ...style, paddingLeft: `calc(${level}em + 5px)` }}
    >
      {!isLeaf && (
        <div className='gm-padding-left-5' onClick={handleGroup}>
          {isGrouped ? (
            <SVGCloseup className='gm-tree-v2-list-item-close' />
          ) : (
            <SVGExpand className='gm-tree-v2-list-item-expand' />
          )}
        </div>
      )}
      {!!level && isLeaf && <div style={{ width: '2em' }} />}
      <Checkbox
        checked={isSelected}
        onChange={handleRadio}
        indeterminate={isIndeterminate}
        className='gm-padding-left-5'
      />
      <Flex flex column justifyCenter onClick={handleActive} style={{ height: '100%' }}>
        {isLeaf ? renderLeafItem(data) : renderGroupItem(data)}
      </Flex>
    </Flex>
  )
}

export default Item
