import { PaginationBase } from '@gmfe/react'
import PropTypes from 'prop-types'
import React from 'react'

/**
 * ManagePaginationV2 的 UI 适配层。
 * 条数记忆由 V2 自己写 manage_pagination_v2_<id>；
 * 这里对 PaginationBase 固定 persistLimit=false，避免再写 manage_pagination_<id>
 *（或落到 Provider.limitScope）造成双轨 / 首屏纠偏请求。
 */
const Transform = ({
  count,
  limit,
  currentIndex,
  peek,
  more,
  onChange,
  limitData
}) => {
  const handleChange = ({ offset, limit }) => {
    onChange({
      limit,
      currentIndex: offset / limit
    })
  }

  let newCount = count
  if (count === undefined || count === null) {
    if (peek) {
      newCount = currentIndex * limit + peek
    } else {
      newCount = 0
    }
  }

  const _peekInfo = !count
    ? {
        peek,
        more
      }
    : undefined

  return (
    <PaginationBase
      persistLimit={false}
      data={{
        count: newCount,
        offset: currentIndex * limit,
        limit
      }}
      _peekInfo={_peekInfo}
      onChange={handleChange}
      showCount={!(count === undefined || count === null)}
      limitData={limitData}
    />
  )
}

Transform.propTypes = {
  limit: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  count: PropTypes.number,
  peek: PropTypes.number,
  more: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  limitData: PropTypes.array
}

export default Transform
