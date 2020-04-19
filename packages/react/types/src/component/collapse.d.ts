import { Component, CSSProperties } from 'react'

export interface CollapseProps {
  in: boolean
  className?: string
  style?: CSSProperties
}

declare class Collapse extends Component<CollapseProps, void> {}

export default Collapse
