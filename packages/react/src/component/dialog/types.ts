type DialogType = 'alert' | 'confirm' | 'prompt'
type DialogSize = 'sm' | 'md' | 'lg'

interface DialogProps {
  show: boolean
  title?: string
  type?: DialogType
  onCancel?(): void
  onOK?(value?: string): Promise<string | void> | false | undefined
  size?: DialogSize
  promptDefaultValue?: string
  promptPlaceholder?: string
  cancelBtn?: string | boolean
  OKBtn?: string | boolean
  disableMaskClose?: boolean
  _from?: string
}

interface DialogState {
  show: boolean
  isLoading: boolean
}

export type { DialogType, DialogState, DialogSize, DialogProps }
