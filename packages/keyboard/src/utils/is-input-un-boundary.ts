import { KeyboardEvent } from 'react'

function isInputUnBoundary(event: KeyboardEvent<HTMLElement>): boolean {
  const { key, target } = event
  const {
    tagName,
    type,
    selectionStart,
    selectionEnd,
    value,
  } = target as HTMLInputElement

  if (
    tagName === 'INPUT' &&
    type === 'text' &&
    (key === 'ArrowLeft' || key === 'ArrowRight')
  ) {
    // 有选择文本
    if (selectionStart !== selectionEnd) return true
    else if (event.key === 'ArrowLeft') {
      if (selectionStart !== 0) return true
    } else if (event.key === 'ArrowRight') {
      if (selectionEnd !== value.length) return true
    }
  }
  return false
}

export default isInputUnBoundary
