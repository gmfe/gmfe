import { createContext } from 'react'

interface ContextOptions {
  leftWidth?: number | string
}

const Context = createContext<ContextOptions>({})

export default Context
