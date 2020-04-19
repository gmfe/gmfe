import React, { cloneElement, Component, ReactComponentElement } from 'react'
import _ from 'lodash'
import getList, { ComponentListMapValue, PopUpListType } from './get_list'
import LAYOUT_TYPE from './layout_type'

let setComponentFunction:
  | ((
      type: keyof LayoutRootState,
      list: ComponentListMapValue[] | ReactComponentElement<any> | null
    ) => void)
  | null = null

interface LayoutRootState {
  _popup: ComponentListMapValue[] | null
  modal: ReactComponentElement<any> | null
  _tip: ComponentListMapValue[] | null
  fullloading: ReactComponentElement<any> | null
  nprogress: ReactComponentElement<any> | null
  drawer: ReactComponentElement<any> | null
}

class LayoutRoot extends Component<{}, LayoutRootState> {
  static TYPE = LAYOUT_TYPE

  static setComponentPopup(id: string, com: ReactComponentElement<any>): void {
    setComponentArray(this.TYPE._POPUP as PopUpListType, id, com)
  }

  static removeComponentPopup(id: string): void {
    removeComponentArray(this.TYPE._POPUP as PopUpListType, id)
  }

  static setComponentTip(id: string, com: ReactComponentElement<any>): void {
    setComponentArray(this.TYPE._TIP as PopUpListType, id, com)
  }

  static removeComponentTip(id: string): void {
    removeComponentArray(this.TYPE._TIP as PopUpListType, id)
  }

  static removeComponentTipAll(): void {
    setComponentFunction && setComponentFunction(this.TYPE._TIP as keyof LayoutRootState, [])
  }

  static setComponent(type: string, com: ReactComponentElement<any>): void {
    if (setComponentFunction) {
      this.removeComponent(type)
      setComponentFunction && setComponentFunction(type as keyof LayoutRootState, com)
    } else {
      console.warn('LayoutRoot is uninitialized')
    }
  }

  static removeComponent(type: string): void {
    if (setComponentFunction) {
      setComponentFunction(type as keyof LayoutRootState, null)
    } else {
      console.warn('LayoutRoot is uninitialized')
    }
  }

  readonly state: LayoutRootState = {
    _popup: null,
    modal: null,
    _tip: null,
    fullloading: null,
    nprogress: null,
    drawer: null,
  }

  componentDidMount() {
    setComponentFunction = (type, list) => {
      const s: Partial<LayoutRootState> = {}
      s[type] = list as any
      this.setState(s as LayoutRootState)
    }
  }

  componentWillUnmount() {
    setComponentFunction = null
  }

  render() {
    const { drawer, _popup, modal, _tip, fullloading, nprogress } = this.state
    // 有层级关系
    return (
      <div>
        {!!_popup?.length && (
          <div>{_popup.map((v) => cloneElement(v.com, { key: v.id, ...v.com.props }))}</div>
        )}
        {drawer && <div>{drawer}</div>}
        {modal && <div>{modal}</div>}
        {!!_tip?.length && (
          <div className='gm-tips'>
            {_tip.map((v) => cloneElement(v.com, { key: v.id, ...v.com.props }))}
          </div>
        )}
        {fullloading && <div>{fullloading}</div>}
        {nprogress && <div>{nprogress}</div>}
      </div>
    )
  }
}

export default LayoutRoot

function setComponentArray(type: PopUpListType, id: string, com: ReactComponentElement<any>): void {
  const list = getList(type)
  if (setComponentFunction) {
    const index = list.findIndex((value) => value.id === id)
    if (index === -1) {
      list.push({ id, com })
    } else {
      list[index] = { id, com }
    }
    setComponentFunction(type, list)
  } else {
    console.warn('LayoutRoot is uninitialized')
  }
}

function removeComponentArray(type: PopUpListType, id: string): void {
  const list = getList(type)
  if (setComponentFunction) {
    _.remove(list, (value) => value.id === id)
    setComponentFunction(type, list)
  } else {
    console.warn('LayoutRoot is uninitialized')
  }
}
