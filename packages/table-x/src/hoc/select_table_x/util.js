import { createContext } from 'react'

const SelectContext = createContext({
  selected: [],
  isSelectAll: false,
  onSelect: () => {},
  onSelectAll: () => {}
})

export { SelectContext }
