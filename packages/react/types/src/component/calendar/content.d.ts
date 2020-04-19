import { FC } from 'react'

export interface ContentProps {
  begin?: Date
  end?: Date
  onSelect(value: Date): void
  will?: Date
  min?: Date
  max?: Date
  disabledDate?(date: Date): boolean
  hoverDay?: Date
  onHoverDay?(date: Date): void
}

declare const Content: FC<ContentProps>
export default Content
