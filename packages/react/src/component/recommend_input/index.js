import React, { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import Input from '../input'
import Popover from '../popover'
import List from '../list'
import _ from 'lodash'
import { pinYinFilter } from '@gm-common/tool'
import SVGCloseCircle from '../../../svg/close-circle.svg'
import classNames from 'classnames'

const RecommendInput = props => {
  const {
    onChange,
    value,
    data,
    listHeight,
    disabled,
    className,
    inputMaxLength,
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

    onChange(changeVal)
  }

  const handleSelect = selected => {
    // 选择后隐藏
    popoverRef.current.apiDoSetActive(false)
    onChange(selected)
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <Popover
      ref={popoverRef}
      type='realFocus'
      popup={
        searchData.length > 0 ? (
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
      <div
        {...rest}
        className={classNames('gm-recommend-input', className, {
          disabled: disabled
        })}
      >
        <Input
          value={value}
          onChange={handleChange}
          type='text'
          disabled={disabled}
          className='form-control'
          maxLength={inputMaxLength}
        />
        <SVGCloseCircle
          onClick={disabled ? _.noop : handleClear}
          className='gm-cursor gm-recommend-input-clear-btn'
        />
      </div>
    </Popover>
  )
}

RecommendInput.defaultProps = {
  listHeight: '180px'
}

RecommendInput.propTypes = {
  /** 推荐列表的数据，格式：[ { text: 'text1' },{ text: 'text2' },...] */
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  /** 接收change value。value => {} */
  onChange: PropTypes.func.isRequired,
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 列表高度 */
  listHeight: PropTypes.string,
  inputMaxLength: PropTypes.number,
  className: PropTypes.string
}

export default RecommendInput
