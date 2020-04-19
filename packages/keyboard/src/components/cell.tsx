import { cloneElement, Component, ReactElement } from 'react'
import {
  KEYBOARD_DIRECTION,
  KEYBOARD_ENTER,
  KEYBOARD_ONFOCUS,
  KEYBOARD_TAB,
} from '../utils'
import { KeyboardCustomEvent, KeyboardDirection, WrapDataOptions } from '../types'

// 缓存起来，方便 Cell 不可用时把命令传给下一个响应者
const dispatchCache: {
  [id: string]: { eventName: string; detail?: Partial<KeyboardCustomEvent> }
} = {}

export interface KeyboardCellProps {
  wrapData: WrapDataOptions
  /* Cell 的身份标志，让 Wrap 更方便找到 */
  cellKey: string
  /* Wrap 要 focus 到单元格的时候触发 onFocus，请实现此功能 */
  onFocus(): void
  /* 表格多的时候需要滚到视窗 */
  onScroll(data: WrapDataOptions['fixedWidths']): void
  /* 是否具有响应能力 */
  disabled?: boolean
}

/**
 * Cell 和 Wrap 配合使用，使单元格具有响应键盘能力
 *
 * 使用：
 * - 实现 onFocus
 * - 监听 keydown，并根据自身需要处理 keydown 事件，每个组件都会不太一样
 * - 把动作 方向、Tab、Enter 通过 Cell 提供的方法 refCell.current.apiDoXXX 反馈给 Cell。具体方法见代码
 */
class KeyboardCell extends Component<KeyboardCellProps> {
  apiDoDirection = (direction: KeyboardDirection) => {
    this._dispatch(KEYBOARD_DIRECTION, { direction })
  }

  apiDoDirectionByEventKey = (eventKey: string) => {
    this.apiDoDirection(eventKey.slice(5).toLowerCase() as KeyboardDirection)
  }

  apiDoTab = () => {
    this._dispatch(KEYBOARD_TAB)
  }

  apiDoEnter = () => {
    this._dispatch(KEYBOARD_ENTER)
  }

  private _dispatch = (eventName: string, detail?: Partial<KeyboardCustomEvent>) => {
    const { wrapData, cellKey } = this.props
    dispatchCache[wrapData.id] = {
      eventName,
      detail,
    }

    window.dispatchEvent(
      new CustomEvent(`${eventName}${wrapData.id}`, { detail: { ...detail, cellKey } })
    )
  }

  private _handleFocus = (event: CustomEvent<KeyboardCustomEvent>) => {
    const { wrapData, onFocus, onScroll, cellKey, disabled } = this.props
    if (event.detail.cellKey !== cellKey) return
    if (!disabled) {
      onFocus()
      onScroll(wrapData.fixedWidths)
    }
    // 不可响应，则抛给下一个响应者
    else {
      this._dispatch(
        dispatchCache[wrapData.id].eventName,
        dispatchCache[wrapData.id].detail
      )
    }
  }

  componentDidMount() {
    const { wrapData } = this.props
    window.addEventListener(
      `${KEYBOARD_ONFOCUS}${wrapData.id}`,
      (this._handleFocus as any) as EventListener
    )
  }

  componentWillUnmount() {
    const { wrapData } = this.props
    window.removeEventListener(
      `${KEYBOARD_ONFOCUS}${wrapData.id}`,
      (this._handleFocus as any) as EventListener
    )
  }

  render() {
    const { children, cellKey } = this.props
    return cloneElement(children as ReactElement, {
      'data-cell-key': cellKey,
    })
  }
}
export default KeyboardCell
