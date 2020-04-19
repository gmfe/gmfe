import { CSSProperties, FC } from 'react'

export interface RowProps {
  style?: CSSProperties
  className?: string
  gutter?: { [key: string]: any } | number
}

declare const Row: FC<RowProps>
export default Row