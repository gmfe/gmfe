import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { getLocale } from '@gmfe/locales'
import { Button, Flex, Popover } from '@gmfe/react'

import SVGRemove from '../../svg/remove.svg'
import SVGDelete from '../../svg/delete.svg'
import SVGEdit from '../../svg/edit-pen.svg'
import SVGBusiness from '../../svg/business.svg'
import { TableXBatchActionOptions } from '../types'

interface BatchActionBarProps {
  /* pure=true，不展示[勾选所有页内容]按钮，也没有勾选所有页相关操作 */
  pure?: boolean
  /* 是否选中所有页 */
  isSelectAll?: boolean
  /* 选中多少项 */
  count: number
  /* 批量操作按钮 */
  batchActions: TableXBatchActionOptions[]
  /* 所有页/当前页 切换函数 */
  toggleSelectAll?(isSelectAll: boolean): void
  /* 点击关闭 BatchActionBar 的回调函数 */
  onClose?(): void
}

const ICON_MAP = {
  delete: <SVGDelete />,
  edit: <SVGEdit />,
  business: <SVGBusiness />,
}

const Icon = styled.span`
  padding-right: 4px;
`

const BatchActionBar: FC<BatchActionBarProps> = ({
  isSelectAll,
  pure,
  count,
  batchActions,
  toggleSelectAll,
  onClose,
}) => {
  let selectAllButton: ReactNode
  if (!pure) {
    selectAllButton = (
      <Button
        type='primary'
        className='gm-margin-left-20'
        onClick={() => toggleSelectAll && toggleSelectAll(!isSelectAll)}
      >
        {isSelectAll ? getLocale('勾选当前页内容') : getLocale('勾选所有页内容')}
      </Button>
    )
  }

  return (
    <Flex className='gm-react-table-select-batch-action-bar' alignCenter>
      <Popover
        type='hover'
        offset={-8}
        showArrow
        popup={<div className='gm-padding-5'>{getLocale('取消批量勾选')}</div>}
      >
        <span style={{ width: '12px' }} className='gm-cursor' onClick={onClose}>
          <SVGRemove />
        </span>
      </Popover>
      {selectAllButton}
      <div className='gm-text-bold gm-margin-left-20'>
        {getLocale('已选择')}
        <span className='gm-text-primary'>{isSelectAll ? getLocale('所有') : count}</span>
        {getLocale('项')}
      </div>
      {!!batchActions.length && <div className='gm-margin-left-20'>|</div>}
      {batchActions
        .filter((item) => item.show !== false)
        .map((item) => (
          <div
            data-id={item.dataId}
            key={item.name}
            onClick={item.onClick?.bind(null)}
            style={{ marginLeft: '30px' }}
            className='gm-text-hover-primary gm-cursor gm-text-bold'
          >
            <Icon>{ICON_MAP[item.type]}</Icon>
            {item.name}
          </div>
        ))}
    </Flex>
  )
}

export default BatchActionBar
