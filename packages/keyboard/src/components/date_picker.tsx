import React, { FC, useRef, KeyboardEvent } from 'react'
import { DatePicker, DatePickerProps } from '@gmfe/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from './cell'
import { scrollIntoViewFixedWidth, useContextData } from '../utils'
import { WrapDataOptions } from '../types'

const KCDatePicker: FC<DatePickerProps> = ({ disabled, onKeyDown, ...rest }) => {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<DatePicker>(null)
  const { wrapData, cellKey } = useContextData()

  const handleScroll = (fixedWidths: WrapDataOptions['fixedWidths']) => {
    scrollIntoViewFixedWidth(findDOMNode(targetRef.current) as HTMLElement, fixedWidths)
  }

  const handleFocus = () => {
    targetRef.current?.apiDoFocus()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    onKeyDown && onKeyDown(event)
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight'
    ) {
      event.preventDefault()
      cellRef.current?.apiDoDirectionByEventKey(event.key)
    } else if (event.key === 'Tab') {
      event.preventDefault()
      cellRef.current?.apiDoTab()
    } else if (event.key === 'Enter') {
      event.preventDefault()
      targetRef.current?.apiDoSelectWillActive()
      cellRef.current?.apiDoEnter()
    }
  }

  return (
    <KeyboardCell
      disabled={disabled}
      ref={cellRef}
      wrapData={wrapData}
      cellKey={cellKey}
      onFocus={handleFocus}
      onScroll={handleScroll}
    >
      <DatePicker
        disabled={disabled}
        {...rest}
        popoverType='realFocus'
        onKeyDown={handleKeyDown}
        ref={targetRef}
      />
    </KeyboardCell>
  )
}

export default KCDatePicker
