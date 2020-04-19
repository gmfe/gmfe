import { Component, ReactNode } from 'react'

type TipType = 'success' | 'warning' | 'info' | 'danger'

interface TipProps {
  title?: string
  type?: TipType
  onClose?(): void
}

declare class Tip extends Component<TipProps, void> {
  static defaultProps: {
    title: string
    type: TipType
    onClose(): void
  }

  static tip(options: TipProps & { children: ReactNode }): string
  static success(options: ReactNode): string
  static info(options: ReactNode): string
  static warning(options: ReactNode): string
  static danger(options: ReactNode): string
  static clear(id: string): void
  static clearAll(): void
}
export default Tip
