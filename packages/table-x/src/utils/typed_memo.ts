import { memo } from 'react'

interface IdentityFunction {
  <T>(fn: T): T
}

const typedMemo: IdentityFunction = memo

export default typedMemo
