interface FunctionSetDataOptions {
  text: string
  onClick?(): void
  show?: boolean
  disabled?: boolean
  children?: FunctionSetDataOptions[]
}

interface FunctionSetProps {
  data: FunctionSetDataOptions[]
  right?: boolean
  disabled?: boolean
}

export type { FunctionSetDataOptions, FunctionSetProps }
