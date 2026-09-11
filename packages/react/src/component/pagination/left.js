import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '../select'
import Flex from '../flex'

/** 每页条数下拉默认选项；业务可用 limitData / Provider 覆盖 */
const defaultLimitData = [
  { value: 10, text: 10 },
  { value: 20, text: 20 },
  { value: 50, text: 50 }
]

export { defaultLimitData }

const Limit = ({ value, onChange, limitData }) => {
  return (
    <Select
      data={limitData}
      value={value}
      onChange={onChange}
      style={{ width: '70px' }}
    />
  )
}

Limit.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  limitData: PropTypes.array.isRequired
}

const Left = ({ data, onChange, showCount, limitData }) => {
  const handleChangeLimit = limit => {
    // 回到第一页
    onChange({
      offset: 0,
      limit
    })
  }

  return (
    <Flex alignCenter>
      {showCount && <span>共{data.count}条记录,&nbsp;</span>}
      <span>每页&nbsp;</span>
      <Limit
        value={data.limit}
        limitData={limitData || defaultLimitData}
        onChange={handleChangeLimit}
      />
      <span>&nbsp;条</span>
    </Flex>
  )
}

Left.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  showCount: PropTypes.bool,
  /** 每页条数选项 [{ value, text }, ...]；由 PaginationBase / 业务 props 传入 */
  limitData: PropTypes.array
}

export default Left
