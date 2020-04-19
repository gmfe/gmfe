import {
  Component,
  ComponentType,
  ForwardRefExoticComponent,
  KeyboardEvent,
  RefAttributes,
  RefObject,
  UIEvent,
} from 'react'

interface KeyboardCellProps {
  wrapData: object
  cellKey: string
  onFocus(event: KeyboardEvent): void
  onScroll(event: UIEvent): void
  disabled?: boolean
}

interface WithContextProps {
  forwardedRef?: RefObject<unknown>
}

declare const KC: ForwardRefExoticComponent<
  KeyboardCellProps & WithContextProps
>
export default KC
