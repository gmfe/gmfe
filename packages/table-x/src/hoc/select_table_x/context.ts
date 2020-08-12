import { createContext } from 'react'

interface SelectTableXContextOptions {
  selected: any[]
  isSelectAll: boolean
  onSelect(selected: any[]): void
  onSelectAll(): void
}

const SelectTableXContext = createContext<SelectTableXContextOptions>({
  selected: [],
  isSelectAll: false,
  onSelect() {},
  onSelectAll() {},
})

export default SelectTableXContext
