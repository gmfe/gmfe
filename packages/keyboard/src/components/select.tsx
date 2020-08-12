import React, { useRef, KeyboardEvent } from 'react'
import { Select, SelectProps } from '@gmfe/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from './cell'
import { scrollIntoViewFixedWidth, useContextData } from '../utils'
import { WrapDataOptions } from '../types'

function KCSelect<V>({ disabled, onKeyDown, ...rest }: SelectProps<V>) {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<Select<V>>(null)
  const { wrapData, cellKey } = useContextData()

  const handleFocus = () => {
    targetRef.current?.apiDoFocus()
  }

  const handleScroll = (fixedWidths: WrapDataOptions['fixedWidths']) => {
    scrollIntoViewFixedWidth(findDOMNode(targetRef.current!) as HTMLElement, fixedWidths)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    onKeyDown && onKeyDown(event)
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft'
    ) {
      // 需要阻止
      // 如果下一个是 input，切过去的时候光标会右移一位
      event.preventDefault()
      cellRef.current?.apiDoDirectionByEventKey(event.key)
    } else if (event.key === 'Tab') {
      event.preventDefault()
      cellRef.current?.apiDoTab()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      // Enter 要选择
      targetRef.current?.apiDoSelectWillActive()
      cellRef.current?.apiDoEnter()
    }
  }

  return (
    <KeyboardCell
      ref={cellRef}
      wrapData={wrapData}
      cellKey={cellKey}
      disabled={disabled}
      onFocus={handleFocus}
      onScroll={handleScroll}
    >
      <Select
        {...rest}
        ref={targetRef}
        popoverType='realFocus'
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
    </KeyboardCell>
  )
}

export default KCSelect
