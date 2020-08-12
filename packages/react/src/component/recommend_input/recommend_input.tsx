import React, { useMemo, useRef, FC, FocusEvent } from 'react'
import { Popover } from '../popover'
import { Input } from '../input'
import { List } from '../list'
import _ from 'lodash'
import { pinYinFilter } from '@gm-common/tool'
import SVGCloseCircle from '../../../svg/close-circle.svg'
import classNames from 'classnames'

interface dataOptions {
  text: string
}

export interface RecommendInputProps {
  data: dataOptions[]
  onChange(value: string): void
  value: string
  disabled?: boolean
  listHeight?: string
  className?: string
  placeholder?: string
}

const RecommendInput: FC<RecommendInputProps> = ({
  onChange,
  value,
  data,
  listHeight = '180px',
  disabled,
  className,
  ...rest
}) => {
  const popoverRef = useRef<Popover>(null)

  // 构造list需要的数据结构
  const _data = useMemo(() => {
    return _.map(data, (item: dataOptions) => {
      return {
        ...item,
        value: item.text,
      }
    })
  }, [data])

  const searchData = useMemo(() => {
    return pinYinFilter(_data, value, (item: dataOptions) => item.text)
  }, [value, _data])

  const handleChange = (event: FocusEvent<HTMLInputElement>) => {
    const changeVal = event.target.value

    onChange(changeVal)
  }

  const handleSelect = (selected: string) => {
    // 选择后隐藏
    popoverRef.current!.apiDoSetActive(false)
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
          <List data={searchData} onSelect={handleSelect} style={{ height: listHeight }} />) : (
                 <></> // 需要element
        )
      }
      disabled={disabled}
    >
      <div
        {...rest}
        className={classNames('gm-recommend-input', className, { disabled: disabled })}
      >
        <Input
          value={value}
          onChange={handleChange}
          type='text'
          disabled={disabled}
          className='form-control'
        />
        <SVGCloseCircle
          onClick={disabled ? _.noop : handleClear}
          className='gm-cursor gm-recommend-input-clear-btn'
        />
      </div>
    </Popover>
  )
}

export default RecommendInput
