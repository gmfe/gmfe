import { CSSProperties, MouseEvent, ReactNode } from 'react'

interface TourStepOptions {
  selector?: string
  content: ReactNode
  observe?: string
  position?: number[] | 'top' | 'right' | 'bottom' | 'left' | 'center'
  actionAfter?(element: Element | null): void | Promise<void>
  actionBefore?(): void | Promise<void>
  style?: CSSProperties
  stepInteraction?: boolean
}

interface TourProps {
  className?: string
  isOpen: boolean

  /* 生命周期 */
  /* 打开之后的回调 */
  onAfterOpen?(dom: HTMLDivElement): void
  /* 关闭之前的回调 */
  onBeforeClose?(dom: HTMLDivElement | null): void
  /* 请求之后关闭的回调 */
  onRequestClose?(event?: MouseEvent): void

  /* 延迟 */
  scrollDuration?: number
  /* 开始 */
  startAt?: number
  /* 引导与内容的间隙 */
  maskSpace?: number
  maskClassName?: string
  /* 蒙层是否触发关闭 */
  closeWithMask?: boolean
  /* 步骤设置 */
  steps?: TourStepOptions[]
  /* 禁用按钮 */
  disableButtons?: boolean
  /* 禁用互动 */
  disableInteraction?: boolean
  /* 禁用互动样式 */
  disableInteractionClassName?: string
  rounded?: number
}

interface TourRefOptions {
  apiToNextStep(): void
  apiClose(): void
  apiRecalculate(): void
}

export type { TourProps, TourStepOptions, TourRefOptions }
