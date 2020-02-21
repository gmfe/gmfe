import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Flex from '../flex'
import { Checkbox } from '../checkbox'
import SVGPlus from '../../../svg/plus.svg'
import SVGMinus from '../../../svg/minus.svg'
import {
  listToFlatFilterWithGroupSelected,
  unSelectAll,
  getLeafValues
} from './util'
import { FixedSizeList } from 'react-window'

const Item = ({
  isGrouped,
  onGroup,
  isSelected,
  onSelect,
  flatItem: { isLeaf, level, data },
  style,
  renderLeafItem,
  renderGroupItem
}) => {
  const handleGroup = e => {
    e.stopPropagation()
    onGroup(data, !isGrouped)
  }

  const handleRadio = () => {
    onSelect(data, !isSelected)
  }

  const handleName = () => {
    if (isLeaf) {
      onSelect(data, !isSelected)
    } else {
      onGroup(data, !isGrouped)
    }
  }

  return (
    <Flex
      alignCenter
      className='gm-tree-v2-list-item'
      style={{
        ...style,
        paddingLeft: `calc(${level}em + 5px)`
      }}
    >
      {!isLeaf && (
        <div className='gm-padding-left-5' onClick={handleGroup}>
          {isGrouped ? <SVGMinus /> : <SVGPlus />}
        </div>
      )}
      {level > 0 && isLeaf && <div style={{ width: '2em' }} />}
      <Checkbox
        checked={isSelected}
        onChange={handleRadio}
        className='gm-padding-left-5'
      />
      <Flex flex column block onClick={handleName}>
        {isLeaf ? renderLeafItem(data) : renderGroupItem(data)}
      </Flex>
    </Flex>
  )
}

Item.propTypes = {
  isGrouped: PropTypes.bool.isRequired,
  onGroup: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  flatItem: PropTypes.shape({
    isLeaf: PropTypes.bool.isRequired,
    level: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired
  }),
  style: PropTypes.object.isRequired,
  renderLeafItem: PropTypes.func,
  renderGroupItem: PropTypes.func
}
Item.defaultProps = {
  renderLeafItem: data => data.text,
  renderGroupItem: data => data.text
}

const List = ({
  list,
  groupSelected,
  onGroupSelect,
  selectedValues,
  onSelectValues,
  listHeight,
  renderLeafItem,
  renderGroupItem
}) => {
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

  // eslint-disable-next-line
  const Row = ({ index, style }) => {
    const flatItem = flatList[index]
    const isGrouped = groupSelected.includes(flatItem.data.value)
    const isSelected = !unSelectAll([flatItem.data], selectedValues)

    return (
      <Item
        key={flatItem.data.value}
        isGrouped={isGrouped}
        onGroup={handleGroup}
        onSelect={handleSelect}
        isSelected={isSelected}
        flatItem={flatItem}
        style={style}
        renderLeafItem={renderLeafItem}
        renderGroupItem={renderGroupItem}
      />
    )
  }

  return (
    <FixedSizeList
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
  renderGroupItem: PropTypes.func
}

export default List
