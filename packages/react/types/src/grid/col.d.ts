import { FC } from 'react'

type ColSize = { [key: string]: unknown } | number

export interface ColProps {
  className?: string
  span?: number
  offset?: number
  sm?: ColSize
  md?: ColSize
  lg?: ColSize
  xl?: ColSize
}

declare const Col: FC<ColProps>
export default Col
