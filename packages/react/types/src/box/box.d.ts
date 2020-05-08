import { FC, AllHTMLAttributes } from 'react'

export interface BoxProps extends AllHTMLAttributes<HTMLDivElement> {
  hasGap?: boolean
}

declare const Box: FC<BoxProps>

export default Box
