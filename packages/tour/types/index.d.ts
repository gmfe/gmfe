import {
  CSSProperties,
  ForwardRefExoticComponent,
  MouseEvent,
  ReactNode,
  RefAttributes,
} from 'react'

type TourStepsPosition =
  | number[]
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'center'

interface TourProps {
  className?: string
  isOpen: boolean
  onAfterOpen?(element: HTMLDivElement): void
  onBeforeClose?(element: HTMLDivElement): void
  onRequestClose?(event: MouseEvent<HTMLButtonElement>): void
  scrollDuration?: number
  startAt?: number
  maskSpace?: number
  maskClassName?: string
  closeWithMask?: boolean
  steps?: {
    selector?: string
    content: ReactNode
    observe?: string
    position?: TourStepsPosition
    actionAfter?(element: HTMLElement): void
    actionBefore?(element: Element): void
    style?: CSSProperties
    stepInteraction?: boolean
  }[]
  disableButtons?: boolean
  disableInteraction?: boolean
  disableInteractionClassName?: string
  rounded?: number
}

interface TourRefOptions extends HTMLDivElement {
  apiToNextStep(): void
  apiClose(): void
  apiRecalculate(): void
}

declare const Tour: ForwardRefExoticComponent<
  TourProps & RefAttributes<TourRefOptions>
>
export default Tour
