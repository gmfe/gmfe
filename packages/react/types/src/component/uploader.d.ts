import { ChangeEvent, CSSProperties, FC } from 'react'

export interface UploaderProps {
  onUpload(files: FileList, event: ChangeEvent<HTMLInputElement>): void
  disabled?: boolean
  accept?: string
  multiple?: boolean
  className?: string
  style?: CSSProperties
}
declare const Uploader: FC<UploaderProps>
export default Uploader
