import React, { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import Input from '../input'
import Popover from '../popover'
import List from '../list'
import _ from 'lodash'
import { pinYinFilter } from '@gm-common/tool'
import SVGCloseCircle from '../../../svg/close-circle.svg'
import classNames from 'classnames'

const SearchInput = props => {
  const {
    onChange,
    value,
    data,
    listHeight,
    disabled,
    className,
    ...rest
  } = props
  const popoverRef = useRef(null)

  // 构造list需要的数据结构
  const _data = useMemo(() => {
    return _.map(data, item => {
      return {
        ...item,
        value: item.text
      }
    })
  }, [data])

  const searchData = useMemo(() => {
    return pinYinFilter(_data, value, item => item.text)
  }, [value, _data])

  const handleChange = e => {
    const changeVal = e.target.value

    onChange && onChange(changeVal)
  }

  const handleSelect = selected => {
    // 选择后隐藏
    popoverRef.current.apiDoSetActive(false)
    onChange && onChange(selected)
  }

  const handleClear = () => {
    onChange && onChange('')
  }

  return (
    <Popover
      ref={popoverRef}
      type='realFocus'
      popup={
        searchData && searchData.length > 0 ? (
          <List
            data={searchData}
            onSelect={handleSelect}
            style={{ height: listHeight }}
          />
        ) : (
          <></> // 需要element
        )
      }
      disabled={disabled}
    >
      <div className='gm-search-input'>
        <Input
          {...rest}
          value={value}
          onChange={handleChange}
          className={classNames('form-control', className, {
            disabled: disabled
          })}
          type='text'
          disabled={disabled}
        />
        <SVGCloseCircle
          onClick={disabled ? _.noop : handleClear}
          className='gm-cursor gm-search-input-clear-btn'
        />
      </div>
    </Popover>
  )
}

SearchInput.defaultProps = {
  listHeight: '180px',
  disabled: false
}

SearchInput.propTypes = {
  /** 推荐列表数据：[ { text: 'text1' },{ text: 'text2' },...] */
  data: PropTypes.array.isRequired,
  /** 受控组件必传 */
  value: PropTypes.string.isRequired,
  /** 受控组件必传 */
  onChange: PropTypes.func.isRequired,
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 列表高度 */
  listHeight: PropTypes.string,
  className: PropTypes.string
}

export default SearchInput
