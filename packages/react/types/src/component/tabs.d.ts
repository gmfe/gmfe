import { FC } from 'react'

export interface TabsProps {
  tabs: string[]
  active?: number
  defaultActive?: number
  lazy?: boolean
  onChange?(active: number): void
}

declare const Tabs: FC<TabsProps>
export default Tabs
