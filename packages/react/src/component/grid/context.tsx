import { createContext } from 'react'
import { RowContextOptions } from './types'

const rowContext = createContext<RowContextOptions>({})

export default rowContext
