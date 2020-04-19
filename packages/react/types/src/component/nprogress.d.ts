import { FC } from 'react'

interface NProgressFC extends FC {
  start(): void
  done(): void
}

declare const NProgress: NProgressFC
export default NProgress
