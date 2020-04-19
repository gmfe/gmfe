import { FC } from 'react'

export interface HeadProps {
  value?: Date
  onChange?(value: Date): void
  disabledYearAndMonth?: 'left' | 'right'
}

declare const Head: FC<HeadProps>
export default Head
