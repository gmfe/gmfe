import React, { useRef, KeyboardEvent } from 'react'
import { MoreSelect, MoreSelectProps } from '@gmfe/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from './cell'
import { isInputUnBoundary, scrollIntoViewFixedWidth, useContextData } from '../utils'
import { WrapDataOptions } from '../types'

function KCMoreSelect<V>({ disabled, onKeyDown, ...rest }: MoreSelectProps<V>) {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<MoreSelect<V>>(null)
  const { wrapData, cellKey } = useContextData()

  const handleFocus = () => {
    targetRef.current?.apiDoFocus()
  }

  const handleScroll = (fixedWidths: WrapDataOptions['fixedWidths']) => {
    scrollIntoViewFixedWidth(findDOMNode(targetRef.current!) as HTMLElement, fixedWidths)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown && onKeyDown(event)
    if (isInputUnBoundary(event)) return
    if (
      event.key === 'ArrowUp' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown'
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
      ref={cellRef}
      disabled={disabled}
      wrapData={wrapData}
      cellKey={cellKey}
      onFocus={handleFocus}
      onScroll={handleScroll}
    >
      <MoreSelect
        {...rest}
        disabled={disabled}
        ref={targetRef}
        popoverType='realFocus'
        onKeyDown={handleKeyDown}
        isKeyboard
      />
    </KeyboardCell>
  )
}

export default KCMoreSelect
