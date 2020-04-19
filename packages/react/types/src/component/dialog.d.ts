import { Component, ReactNode } from 'react'

type DialogType = 'alert' | 'confirm' | 'prompt'
type DialogSize = 'sm' | 'md' | 'lg'

interface DialogProps {
  show: boolean
  title?: string
  type?: DialogType
  onCancel?: () => void
  onOK?: () => void | Promise<any>
  size?: DialogSize
  promptDefaultValue?: string
  promptPlaceholder?: string
  cancelBtn?: string | boolean
  OKBtn?: string | boolean
  disableMaskClose?: boolean
  _from?: string
}

interface DialogStaticOptions extends DialogProps {
  children: ReactNode
}

interface DialogState {
  show: boolean
  isLoading: boolean
}

declare class Dialog extends Component<DialogProps, DialogState> {
  static defaultProps: {
    show: boolean
    title: string
    type: DialogType
    onCancel(): void
    onOK(): void
    size: DialogSize
    cancelBtn: string
    OKBtn: string
    disableMaskClose: boolean
  }

  static alert(options: DialogStaticOptions): Promise<void>
  static confirm(options: DialogStaticOptions): Promise<void>
  static prompt(options: DialogStaticOptions): Promise<void>
  static dialog(options: DialogStaticOptions): Promise<void>

  readonly state: DialogState
}
export default Dialog
export { DialogStaticOptions, DialogProps, DialogSize, DialogType }
