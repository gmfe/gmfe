import { Component, CSSProperties, ReactNode } from 'react'

interface DrawerProps {
  onHide?(): void
  className?: string
  style?: CSSProperties
  animation?: boolean
  opacityMask?: boolean
}

interface DrawerStaticOptions extends DrawerProps {
  children: ReactNode
}

declare class Drawer extends Component<DrawerProps, void> {
  static defaultProps: {
    onHide(): void
    animation: boolean
    opacityMask: boolean
  }

  static render(options: DrawerStaticOptions): void
  static hide(): void
}

export default Drawer
export { DrawerStaticOptions, DrawerProps }
