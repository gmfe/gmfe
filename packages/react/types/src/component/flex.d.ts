import { Component, CSSProperties } from 'react'

export interface FlexProps {
  flex?: number | boolean
  auto?: boolean
  none?: boolean
  width?: string
  height?: string
  row?: boolean
  column?: boolean
  wrap?: boolean
  nowrap?: boolean
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyCenter?: boolean
  justifyBetween?: boolean
  justifyAround?: boolean
  alignStart?: boolean
  alignEnd?: boolean
  alignCenter?: boolean
  alignBaseline?: boolean
  alignStretch?: boolean
  alignContentStart?: boolean
  alignContentEnd?: boolean
  alignContentCenter?: boolean
  alignContentBetween?: boolean
  alignContentAround?: boolean
  alignContentStretch?: boolean
  className?: string
  style?: CSSProperties
}

declare class Flex extends Component<FlexProps, void> {}
export default Flex
