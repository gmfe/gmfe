import { Component } from 'react'

interface FunctionSetProps {
  data: FunctionSetDataOptions[]
  right?: boolean
  disabled?: boolean
}

interface FunctionSetDataOptions {
  text: string
  disabled?: boolean
  show?: boolean
  onClick(): void
  children?: FunctionSetDataOptions[]
}

declare class FunctionSet extends Component<FunctionSetProps, void> {
  apiDoSetActive
}
export default FunctionSet
export { FunctionSetProps, FunctionSetDataOptions }
