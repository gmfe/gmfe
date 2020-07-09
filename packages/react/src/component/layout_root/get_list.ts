import { ReactComponentElement } from 'react'

type PopUpListType = '_popup' | '_tip'

interface ComponentListMapValue {
  id: string
  com: ReactComponentElement<any>
}

type ComponentListMap = {
  [key in PopUpListType]: ComponentListMapValue[]
}

const componentListMap: ComponentListMap = {
  _popup: [],
  _tip: [],
}

function getList(type: PopUpListType) {
  if (!componentListMap[type]) {
    componentListMap[type] = []
  }
  return componentListMap[type]
}

export default getList
export type { PopUpListType, ComponentListMap, ComponentListMapValue }
