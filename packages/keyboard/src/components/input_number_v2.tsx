import React, { FC, useRef, FocusEvent, KeyboardEvent } from 'react'
import { InputNumberV2, InputNumberV2Props } from '@gmfe/react'
import { findDOMNode } from 'react-dom'

import KeyboardCell from './cell'
import { isInputUnBoundary, scrollIntoViewFixedWidth, useContextData } from '../utils'
import { WrapDataOptions } from '../types'

const KCInputNumberV2: FC<InputNumberV2Props> = ({
  disabled,
  onKeyDown,
  onFocus,
  ...rest
}) => {
  const cellRef = useRef<KeyboardCell>(null)
  const targetRef = useRef<InputNumberV2>(null)
  const { cellKey, wrapData } = useContextData()

  const handleScroll = (fixedWidths: WrapDataOptions['fixedWidths']) => {
    scrollIntoViewFixedWidth(findDOMNode(targetRef.current!) as HTMLElement, fixedWidths)
  }

  const handleFocus = () => {
    targetRef.current?.apiDoFocus()
  }

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(event)
      return
    }
    event.target && event.target.select()
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
      ref={cellRef}
      wrapData={wrapData}
      cellKey={cellKey}
      onFocus={handleFocus}
      disabled={disabled}
      onScroll={handleScroll}
    >
      <InputNumberV2
        {...rest}
        onFocus={handleInputFocus}
        ref={targetRef}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
    </KeyboardCell>
  )
}

export default KCInputNumberV2
