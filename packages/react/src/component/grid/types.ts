import { HTMLAttributes } from 'react'
import { FlexProps } from '../flex/flex'

type ColSizeType = 'sm' | 'md' | 'lg' | 'xl'

type RowProps = FlexProps & {
  /* 栅栏间隔，可以写成像素值或支持响应式的对象写法，默认为10 */
  gutter?: number | { [key in ColSizeType]: number }
}

type ColSize = number | { span?: number; offset?: number }

interface ColProps extends HTMLAttributes<HTMLDivElement> {
  /* 栅栏占位格数，为 0 时相当于 display: none */
  span?: number
  /* 栅栏左偏移量 */
  offset?: number
  /* 768px */
  sm?: ColSize
  /* 992px */
  md?: ColSize
  /* 1200px */
  lg?: ColSize
  /* 1920px */
  xl?: ColSize
}

interface RowContextOptions {
  gutter?: number | { [key in ColSizeType]: number }
}

export type { RowProps, ColProps, RowContextOptions }
