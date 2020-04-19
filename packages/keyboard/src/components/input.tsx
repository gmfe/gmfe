import React, { FC, useRef, FocusEvent, KeyboardEvent } from 'react'
import { Input, InputProps } from '@gmfe/react'

import KeyboardCell from './cell'
import { isInputUnBoundary, scrollIntoViewFixedWidth, useContextData } from '../utils'
import { WrapDataOptions } from '../types'

const KCInput: FC<InputProps> = ({ disabled, onKeyDown, onFocus, ...rest }) => {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<HTMLInputElement>(null)
  const { wrapData, cellKey } = useContextData()

  const handleFocus = () => {
    targetRef.current?.focus()
  }

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event)
      return
    }
    event.target && event.target.select()
  }

  const handleScroll = (fixedWidths: WrapDataOptions['fixedWidths']) => {
    scrollIntoViewFixedWidth(targetRef.current!, fixedWidths)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown && onKeyDown(event)
    if (isInputUnBoundary(event)) return
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft'
    ) {
      // 需要阻止
      // 如果下一个是 input，切换过去的时候光标会右移一位
      event.preventDefault()
      cellRef.current?.apiDoDirectionByEventKey(event.key)
    } else if (event.key === 'Tab') {
      // 要阻止默认
      cellRef.current?.apiDoTab()
    } else if (event.key === 'Enter') {
      // 要阻止默认
      event.preventDefault()
      cellRef.current?.apiDoEnter()
    }
  }
  return (
    <KeyboardCell
      ref={cellRef}
      wrapData={wrapData}
      cellKey={cellKey}
      disabled={disabled}
      onScroll={handleScroll}
      onFocus={handleFocus}
    >
      <Input
        ref={targetRef}
        {...rest}
        onFocus={handleInputFocus}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
    </KeyboardCell>
  )
}

export default KCInput
