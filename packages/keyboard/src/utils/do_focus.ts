import { KEYBOARD_ONFOCUS } from './constant'
import { KeyboardCustomEvent } from '../types'

function doFocus(id: string, rowKey: number, columnKey: string) {
  window.dispatchEvent(
    new CustomEvent<Pick<KeyboardCustomEvent, 'cellKey'>>(`${KEYBOARD_ONFOCUS}${id}`, {
      detail: {
        cellKey: `${rowKey}_${columnKey}`,
      },
    })
  )
}

export default doFocus
