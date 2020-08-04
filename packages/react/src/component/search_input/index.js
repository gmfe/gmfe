import React, { useState, useMemo, useRef } from 'react'
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
    defaultValue,
    onChange,
    value,
    data,
    listHeight,
    disabled,
    className,
    ...rest
  } = props
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isControlled = useMemo(() => _.isUndefined(defaultValue), []) // 若defaultValue有值，则为非受控,只以最开始的值为准
  const [val, setVal] = useState(isControlled ? value : defaultValue)
  const popoverRef = useRef(null)
  const _value = isControlled ? value : val

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
    return pinYinFilter(_data, _value, item => item.text)
  }, [_value, _data])

  const handleChange = e => {
    const changeVal = e.target.value

    doChange(changeVal)
  }

  const handleSelect = selected => {
    // 选择后隐藏
    popoverRef.current.apiDoSetActive(false)
    doChange(selected)
  }

  const doChange = value => {
    if (!isControlled) {
      setVal(value)
    }

    onChange && onChange(value)
  }

  const handleClear = () => {
    doChange('')
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
      <div
        className={classNames('gm-search-input', className, {
          disabled: disabled
        })}
      >
        <Input
          {...rest}
          value={_value}
          onChange={handleChange}
          className='form-control'
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
  /** 非受控时传默认值 */
  defaultValue: props => {
    const { defaultValue, value, onChange } = props
    if (!_.isUndefined(defaultValue) && !_.isUndefined(value)) {
      console.error('不能同时使用 value 和 defaultValue !')
    } else {
      if (!_.isUndefined(value) && !_.isFunction(onChange)) {
        console.error('若使用 value,请提供 onChange 函数 !')
      }

      if (!_.isUndefined(defaultValue) && !_.isString(defaultValue)) {
        console.error('defaultActiveKey must be string')
      }

      if (_.isUndefined(defaultValue) && _.isUndefined(value)) {
        console.error('defaultValue 和 value必须提供一个！')
      }
    }
  },
  /** 受控组件必传 */
  value: PropTypes.string,
  /** 受控组件必传 */
  onChange: PropTypes.func,
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 列表高度 */
  listHeight: PropTypes.string,
  className: PropTypes.string
}

export default SearchInput
