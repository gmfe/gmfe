import React, { FC, useCallback, useContext } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import paginationContext, { PaginationContextOptions } from '../utils/context'
import getIndex from '../utils/get_index'
import { Flex } from '../../flex'
import SVGLeftSmall from '../../../../svg/left-small.svg'
import SVGRightSmall from '../../../../svg/right-small.svg'

interface PagePeekProps {
  _peekInfo: {
    more?: boolean
    peek?: number
  }
}

const PagePeek: FC<PagePeekProps> = ({ _peekInfo }) => {
  const { data, onChange } = useContext(paginationContext) as PaginationContextOptions
  const index = getIndex(data)

  // peek 存在没有的情况，做个假 peek
  if (!_peekInfo.peek) {
    _peekInfo = {
      ..._peekInfo,
      peek: data.limit,
    }
  }

  const handleChange = useCallback(
    (_index: number) => {
      onChange({
        offset: (_index - 1) * data.limit,
        limit: data.limit,
      })
    },
    [onChange, data]
  )

  // 往前显示4个页码
  const begin = Math.max(1, index - 4)
  // 往后显示的页码，
  // 最后一页不显示，属于 ...，所以 -1
  // 最多4页
  const end = Math.min(Math.ceil(_peekInfo.peek! / data.limit) + index - 1, index + 4)

  return (
    <Flex alignCenter className='gm-pagination-page'>
      <div
        className={classNames('gm-pagination-page-item', { disabled: index === 1 })}
        onClick={index === 1 ? _.noop : () => handleChange(index - 1)}
      >
        <SVGLeftSmall />
      </div>

      {_.range(begin, end + 1).map((page, i) => (
        <div
          key={i}
          className={classNames('gm-pagination-page-item', { active: index === page })}
          onClick={index === page ? _.noop : () => handleChange(page)}
        >
          {page}
        </div>
      ))}

      <span
        className='gm-pagination-page-text'
        style={{ display: _peekInfo.more ? 'block' : 'none' }}
      >
        ···
      </span>

      <div
        className={classNames('gm-pagination-page-item', {
          disabled: !_peekInfo.more,
        })}
        onClick={!_peekInfo.more ? _.noop : () => handleChange(index + 1)}
      >
        <SVGRightSmall />
      </div>
    </Flex>
  )
}

export default PagePeek
