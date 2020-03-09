import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import Flex from '../flex'
import { Checkbox } from '../checkbox'
import { listToFlatFilterWithGroupSelected, getLeafValues } from './util'
import { FixedSizeList } from 'react-window'
import SVGExpand from '../../../svg/expand.svg'
import SVGCloseup from '../../../svg/closeup.svg'

const Item = ({
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
  onActive
}) => {
  const handleGroup = e => {
    e.stopPropagation()
    onGroup(data, !isGrouped)
  }

  const handleRadio = () => {
    onSelect(data, !isSelected)
  }

  const handleActive = () => {
    onActive(data)
  }

  return (
    <Flex
      alignCenter
      className={classNames('gm-tree-v2-list-item', active && 'active')}
      style={{
        ...style,
        paddingLeft: `calc(${level}em + 5px)`
      }}
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
      {level > 0 && isLeaf && <div style={{ width: '2em' }} />}
      <Checkbox
        checked={isSelected}
        onChange={handleRadio}
        indeterminate={isIndeterminate}
        className='gm-padding-left-5'
      />
      <Flex
        flex
        column
        onClick={handleActive}
        justifyCenter
        style={{ height: '100%' }}
      >
        {isLeaf ? renderLeafItem(data) : renderGroupItem(data)}
      </Flex>
    </Flex>
  )
}

Item.propTypes = {
  isGrouped: PropTypes.bool.isRequired,
  onGroup: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isIndeterminate: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  flatItem: PropTypes.shape({
    isLeaf: PropTypes.bool.isRequired,
    level: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired
  }),
  style: PropTypes.object.isRequired,
  renderLeafItem: PropTypes.func,
  renderGroupItem: PropTypes.func,
  onActive: PropTypes.func.isRequired,
  active: PropTypes.bool
}
Item.defaultProps = {
  renderLeafItem: data => data.text,
  renderGroupItem: data => data.text,
  active: false
}

const List = ({
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
  highLightValue,
  listRef
}) => {
  const [active, setActive] = useState(-1)
  const flatList = useMemo(() => {
    return listToFlatFilterWithGroupSelected(list, groupSelected)
  }, [list, groupSelected])

  const handleGroup = data => {
    onGroupSelect(_.xor(groupSelected, [data.value]))
  }

  const handleSelect = (data, isSelected) => {
    const values = getLeafValues([data])

    if (isSelected) {
      onSelectValues(_.uniq(selectedValues.concat(values)))
    } else {
      onSelectValues(_.difference(selectedValues, values))
    }
  }

  const handleActive = (item, index, data) => {
    const values = getLeafValues([data])

    setActive(index)
    onActiveValues(values)
  }

  // eslint-disable-next-line
  const Row = ({ index, style }) => {
    const flatItem = flatList[index]
    const isGrouped = groupSelected.includes(flatItem.data.value)

    const selectedLeafValues = _.intersection(
      selectedValues,
      flatItem.leafValues
    )

    let isSelected
    let isIndeterminate
    if (flatItem.isLeaf) {
      isSelected = selectedValues.includes(flatItem.data.value)
      isIndeterminate = false
    } else {
      isSelected =
        flatItem.leafValues.length !== 0 &&
        flatItem.leafValues.length === selectedLeafValues.length
      isIndeterminate = selectedLeafValues.length !== 0 && !isSelected
    }

    return (
      <Item
        key={flatItem.data.value}
        isGrouped={isGrouped}
        onGroup={handleGroup}
        onSelect={handleSelect}
        isSelected={isSelected}
        isIndeterminate={
          indeterminateList.length > 0
            ? _.includes(indeterminateList, flatItem.data.value)
            : isIndeterminate
        }
        flatItem={flatItem}
        style={style}
        renderLeafItem={renderLeafItem}
        renderGroupItem={renderGroupItem}
        active={flatItem.data.value === highLightValue || index === active}
        onActive={handleActive.bind(this, flatItem, index)}
      />
    )
  }

  return (
    <FixedSizeList
      ref={listRef}
      height={listHeight}
      itemCount={flatList.length}
      itemSize={28}
    >
      {Row}
    </FixedSizeList>
  )
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  groupSelected: PropTypes.array.isRequired,
  onGroupSelect: PropTypes.func.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onSelectValues: PropTypes.func.isRequired,
  listHeight: PropTypes.number.isRequired,
  renderLeafItem: PropTypes.func,
  renderGroupItem: PropTypes.func,
  onActiveValues: PropTypes.func.isRequired,
  indeterminateList: PropTypes.array,
  highLightValue: PropTypes.string,
  listRef: PropTypes.object
}

export default List
