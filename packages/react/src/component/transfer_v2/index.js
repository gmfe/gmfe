import React, { useState, useMemo } from 'react'
import { getLocale } from '@gmfe/locales'
import TreeV2 from '../tree_v2'
import Flex from '../flex'
import SvgRightSmall from '../../../svg/right-small.svg'
import SvgLeftSmall from '../../../svg/left-small.svg'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { filterGroupListLeaf } from '../../common/util'

function getLeftAndRightList(list, selectedValues, rightTree) {
  let rightList = []
  const leftList = filterGroupListLeaf(list, leaf => {
    const isRight = selectedValues.includes(leaf.value)
    if (isRight) {
      rightList.push(leaf)
    }
    return !isRight
  })

  if (rightTree) {
    rightList = filterGroupListLeaf(list, leaf => {
      return _.includes(selectedValues, leaf.value)
    })
  }

  return [leftList, rightList]
}

const TransferV2 = ({
  list,
  selectedValues,
  onSelectValues,
  rightTree,
  className,
  style,

  leftTitle,
  leftPlaceholder,
  leftWithFilter,
  leftRenderLeafItem,
  leftRenderGroupItem,
  leftStyle,
  leftClassName,

  rightTitle,
  rightPlaceholder,
  rightWithFilter,
  rightRenderLeafItem,
  rightRenderGroupItem,
  rightStyle,
  rightClassName,

  ...rest
}) => {
  const [{ lefts, rights }, setLeftRights] = useState({
    lefts: [],
    rights: []
  })

  const [leftList, rightList] = useMemo(() => {
    return getLeftAndRightList(list, selectedValues, rightTree)
  }, [list, selectedValues, rightTree])

  const handleLefts = values => {
    setLeftRights({
      lefts: values,
      rights
    })
  }
  const handleRights = values => {
    setLeftRights({
      lefts,
      rights: values
    })
  }

  const handleClick = isLeft => {
    setLeftRights({ lefts: [], rights: [] })
    onSelectValues(_.xor(selectedValues, isLeft ? rights : lefts))
  }

  const handleToLeft = () => {
    handleClick(true)
  }

  const handleToRight = () => {
    handleClick(false)
  }

  return (
    <Flex className={className} {...rest}>
      <TreeV2
        list={leftList}
        onSelectValues={handleLefts}
        selectedValues={lefts}
        title={leftTitle}
        placeholder={leftPlaceholder}
        withFilter={leftWithFilter}
        renderLeafItem={leftRenderLeafItem}
        renderGroupItem={leftRenderGroupItem}
        style={leftStyle}
      />
      <div className='gm-gap-5' />
      <Flex column justifyCenter alignCenter className='gm-transfer-operation'>
        <button
          disabled={lefts.length === 0}
          type='button'
          className='btn btn-default btn-block gm-margin-bottom-5'
          onClick={handleToRight}
        >
          <SvgRightSmall />
        </button>
        <button
          disabled={rights.length === 0}
          type='button'
          className='btn btn-default btn-block'
          onClick={handleToLeft}
        >
          <SvgLeftSmall />
        </button>
      </Flex>
      <div className='gm-gap-5' />
      <TreeV2
        list={rightList}
        onSelectValues={handleRights}
        selectedValues={rights}
        title={rightTitle}
        placeholder={rightPlaceholder}
        withFilter={rightWithFilter}
        renderLeafItem={rightRenderLeafItem}
        renderGroupItem={rightRenderGroupItem}
        style={rightStyle}
      />
    </Flex>
  )
}

TransferV2.propTypes = {
  list: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onSelectValues: PropTypes.func.isRequired,
  rightTree: PropTypes.bool, // 右边是否以树状结构展示
  className: PropTypes.string,
  style: PropTypes.object,

  leftTitle: PropTypes.string,
  leftPlaceholder: PropTypes.string,
  leftWithFilter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  leftRenderLeafItem: PropTypes.func,
  leftRenderGroupItem: PropTypes.func,
  leftStyle: PropTypes.object,
  leftClassName: PropTypes.string,

  rightTitle: PropTypes.string,
  rightPlaceholder: PropTypes.string,
  rightWithFilter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  rightRenderLeafItem: PropTypes.func,
  rightRenderGroupItem: PropTypes.func,
  rightStyle: PropTypes.object,
  rightClassName: PropTypes.string
}
TransferV2.defaultProps = {
  leftTitle: getLocale('待选择'),
  leftStyle: { width: '300px', height: '500px' },
  rightTitle: getLocale('已选择'),
  rightStyle: { width: '300px', height: '500px' }
}
export default TransferV2
