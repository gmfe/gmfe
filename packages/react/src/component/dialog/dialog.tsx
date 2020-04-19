import React, { PropsWithChildren } from 'react'
import { DialogProps } from './types'
import { LayoutRoot } from '../layout_root'
import EVENT_TYPE from '../../event_type'
import DialogComponent from './dialog.component'

export default class Dialog extends DialogComponent {
  static dialog(options: Partial<PropsWithChildren<DialogProps>>): Promise<string> {
    options = Object.assign({ _from: 'DialogStatics', size: 'sm' }, options)
    return new Promise((resolve) => {
      const _OK = options.onOK
      options.onOK = (value) => {
        const result = _OK && _OK(value)

        if (result && result.then) {
          // 简单判断是否promise
          return result.then((v) => {
            LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
            window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_HIDE))

            return v
          })
        } else if (result !== false) {
          resolve(value)
        }

        if (result !== false) {
          LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
          window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_HIDE))
        }
        return result
      }
      options.onCancel = () => {
        LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)
        window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_HIDE))
      }

      LayoutRoot.setComponent(LayoutRoot.TYPE.MODAL, <DialogComponent {...options} show />)
      window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.MODAL_SHOW))
    })
  }

  static alert(options: Partial<PropsWithChildren<DialogProps>>) {
    options.type = 'alert'
    options.size = options.size ?? 'sm'
    return this.dialog(options)
  }

  static confirm(options: Partial<PropsWithChildren<DialogProps>>) {
    options.type = 'confirm'
    options.size = options.size ?? 'sm'
    return this.dialog(options)
  }

  static prompt(options: Partial<PropsWithChildren<DialogProps>>) {
    options.type = 'prompt'
    options.size = options.size ?? 'sm'
    return this.dialog(options)
  }
}
