import React, { useRef, KeyboardEvent } from 'react'
import { LevelSelect, LevelSelectProps } from '@gmfe/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from './cell'
import { isInputUnBoundary, scrollIntoViewFixedWidth, useContextData } from '../utils'
import { WrapDataOptions } from '../types'

function KCLevelSelect<V>({ disabled, onKeyDown, ...rest }: LevelSelectProps<V>) {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<LevelSelect<V>>(null)
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
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown'
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
      <LevelSelect
        {...rest}
        ref={targetRef}
        popoverType='realFocus'
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
    </KeyboardCell>
  )
}

export default KCLevelSelect
