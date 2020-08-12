import React, { useCallback, useMemo, useState } from 'react'
import { getLocale } from '@gmfe/locales'
import _ from 'lodash'
import { TransferV2Props } from './types'
import { Flex } from '../flex'
import { TreeV2 } from '../tree_v2'
import getLeftAndRightList from './get_left_and_right_list'
import { Button } from '../button'
import SvgRightSmall from '../../../svg/right-small.svg'
import SvgLeftSmall from '../../../svg/left-small.svg'

interface TransferV2State<T> {
  lefts: T[]
  rights: T[]
}

const TransferV2 = <T,>({
  list,
  selectedValues,
  onSelectValues,
  rightTree,

  leftTitle = getLocale('待选择'),
  leftPlaceholder,
  leftWithFilter,
  leftRenderLeafItem,
  leftRenderGroupItem,
  leftStyle = { width: '300px', height: '500px' },
  leftClassName,

  rightTitle = getLocale('已选择'),
  rightPlaceholder,
  rightWithFilter,
  rightRenderLeafItem,
  rightRenderGroupItem,
  rightStyle = { width: '300px', height: '500px' },
  rightClassName,
  ...rest
}: TransferV2Props<T>) => {
  const [{ lefts, rights }, setState] = useState<TransferV2State<T>>({ lefts: [], rights: [] })
  const { leftList, rightList } = useMemo(
    () => getLeftAndRightList(list, selectedValues, !!rightTree),
    [list, selectedValues, rightTree]
  )

  const handleLefts = useCallback((lefts: T[]) => {
    setState(({ rights }) => ({ lefts, rights }))
  }, [])

  const handleRights = useCallback((rights: T[]) => {
    setState(({ lefts }) => ({ lefts, rights }))
  }, [])

  const handleMove = useCallback(
    (isLeft: boolean) => {
      setState({ lefts: [], rights: [] })
      onSelectValues(_.xor(selectedValues, isLeft ? rights : lefts))
    },
    [onSelectValues, rights, lefts, selectedValues]
  )

  return (
    <Flex {...rest}>
      <TreeV2
        list={leftList}
        selectedValues={lefts}
        onSelectValues={handleLefts}
        title={leftTitle}
        placeholder={leftPlaceholder}
        withFilter={leftWithFilter}
        renderLeafItem={leftRenderLeafItem}
        renderGroupItem={leftRenderGroupItem}
        style={leftStyle}
        className={leftClassName}
      />
      <div className='gm-gap-5' />
      <Flex column justifyCenter alignCenter className='gm-transfer-operation'>
        <Button
          className='gm-margin-bottom-5'
          disabled={!lefts.length}
          onClick={() => handleMove(false)}
        >
          <SvgRightSmall />
        </Button>
        <Button disabled={!rights.length} onClick={() => handleMove(true)}>
          <SvgLeftSmall />
        </Button>
      </Flex>
      <div className='gm-gap-5' />
      <TreeV2
        list={rightList}
        selectedValues={rights}
        onSelectValues={handleRights}
        title={rightTitle}
        placeholder={rightPlaceholder}
        withFilter={rightWithFilter}
        renderLeafItem={rightRenderLeafItem}
        renderGroupItem={rightRenderGroupItem}
        style={rightStyle}
        className={rightClassName}
      />
    </Flex>
  )
}

export default TransferV2
