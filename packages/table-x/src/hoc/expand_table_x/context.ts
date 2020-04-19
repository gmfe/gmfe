import { createContext } from 'react'

interface ExpandTableXContextOptions {
  expanded: { [key: number]: boolean }
  isExpandAll: boolean
  onExpand(expanded: { [key: number]: boolean }): void
  onExpandAll(): void
}

const ExpandTableXContext = createContext<ExpandTableXContextOptions>({
  expanded: {},
  isExpandAll: false,
  onExpand() {},
  onExpandAll() {},
})

export default ExpandTableXContext
