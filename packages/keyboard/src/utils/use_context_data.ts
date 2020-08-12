import { useContext } from 'react'
import { WrapContext, CellKeyContext } from './context'
import { WrapDataOptions } from '../types'

function useContextData() {
  const wrapData: WrapDataOptions = JSON.parse(useContext(WrapContext))
  const cellKey = useContext(CellKeyContext)

  return { wrapData, cellKey }
}

export default useContextData
