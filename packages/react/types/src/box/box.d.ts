import { FC, HTMLAttributes } from 'react'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  hasGap?: boolean
}

declare const Box: FC<BoxProps>

export default Box
