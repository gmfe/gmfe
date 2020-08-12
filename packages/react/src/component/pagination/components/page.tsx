import React, { FC, useCallback, useContext } from 'react'
import classNames from 'classnames'
import paginationContext, { PaginationContextOptions } from '../utils/context'
import getInfo from '../utils/get_info'
import { Flex } from '../../flex'
import SVGLeftSmall from '../../../../svg/left-small.svg'
import SVGRightSmall from '../../../../svg/right-small.svg'

const Page: FC = () => {
  const { data, onChange } = useContext(paginationContext) as PaginationContextOptions
  const { index, all, begin, end, pages } = getInfo(data)

  const handleChange = useCallback(
    (_index: number) => {
      // 不处理
      if (index === _index || _index < 1 || _index > all) {
        return
      }

      onChange({
        offset: (_index - 1) * data.limit,
        limit: data.limit,
      })
    },
    [onChange, data, all, index]
  )

  return (
    <Flex alignCenter className='gm-pagination-page'>
      <div
        className={classNames('gm-pagination-page-item', { disabled: index === 1 })}
        onClick={() => handleChange(index - 1)}
      >
        <SVGLeftSmall />
      </div>

      {begin >= 2 && (
        <div className='gm-pagination-page-item' onClick={() => handleChange(1)}>
          1
        </div>
      )}
      {begin >= 3 && <span className='gm-pagination-page-text'>···</span>}

      {pages.map((page, i) => (
        <div
          key={i}
          className={classNames('gm-pagination-page-item', {
            active: index === page,
          })}
          onClick={() => handleChange(page)}
        >
          {page}
        </div>
      ))}

      {end <= all - 2 && <span className='gm-pagination-page-text'>···</span>}
      {end <= all - 1 && (
        <div className='gm-pagination-page-item' onClick={() => handleChange(all)}>
          {all}
        </div>
      )}

      <div
        className={classNames('gm-pagination-page-item', {
          disabled: index === all || all === 0,
        })}
        onClick={() => handleChange(index + 1)}
      >
        <SVGRightSmall />
      </div>
    </Flex>
  )
}

export default Page
