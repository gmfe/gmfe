import { createContext } from 'react'

const SelectContext = createContext({
  dataLength: 0,
  selected: [],
  isSelectAll: false,
  onSelect: () => {},
  onSelectAll: () => {}
})

export { SelectContext }
