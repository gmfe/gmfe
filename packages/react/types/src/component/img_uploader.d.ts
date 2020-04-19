import { CSSProperties, FC, ReactNode } from 'react'

export interface ImgUploaderProps {
  data: string[]
  onChange(data: string[]): void
  onUpload(files: FileList): void
  disabled?: boolean
  accept?: string
  multiple?: boolean
  contentSize?: {
    width: string
    height: string
  }
  desc?: string
  imgRender?(data: string): ReactNode
  className?: string
  style?: CSSProperties
}

declare const ImgUploader: FC<ImgUploaderProps>
export default ImgUploader
