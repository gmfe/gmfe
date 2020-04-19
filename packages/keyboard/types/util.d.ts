import { SyntheticEvent } from 'react'

declare const isInputUnBoundary: (event: SyntheticEvent) => boolean

declare const scrollIntoViewFixedWidth: (
  dom: HTMLElement,
  fixedWidth: { leftFixedWidth: number; rightFixedWidth: number }
) => void

declare const doFocus: (
  id: string | number,
  rowKey: string | number,
  columnKey: string | number
) => void

export { isInputUnBoundary, scrollIntoViewFixedWidth, doFocus }
