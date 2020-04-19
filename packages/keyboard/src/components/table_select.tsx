import React, { useRef, KeyboardEvent } from 'react'
import { MoreSelect, TableSelect, TableSelectProps } from '@gmfe/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from './cell'
import { isInputUnBoundary, scrollIntoViewFixedWidth, useContextData } from '../utils'
import { WrapDataOptions } from '../types'

function KCTableSelect<V>({ disabled, onKeyDown, ...rest }: TableSelectProps<V>) {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<MoreSelect<V>>(null)
  const { wrapData, cellKey } = useContextData()

  const handleScroll = (fixedWidths: WrapDataOptions['fixedWidths']) => {
    scrollIntoViewFixedWidth(findDOMNode(targetRef.current!) as HTMLElement, fixedWidths)
  }

  const handleFocus = () => {
    targetRef.current?.apiDoFocus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown && onKeyDown(event)
    if (isInputUnBoundary(event)) return

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
      <TableSelect
        {...(rest as any)}
        ref={targetRef}
        popoverType='realFocus'
        onKeyDown={handleKeyDown}
        isKeyboard
        disabled={disabled}
      />
    </KeyboardCell>
  )
}

export default KCTableSelect
