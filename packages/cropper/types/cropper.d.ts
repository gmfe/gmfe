import CropperJS from 'cropperjs'
import { FC, MouseEvent } from 'react'

interface CropperProps {
  file?: File
  url?: string
  options?: CropperJS.Options
  croppedOptions?: {
    width?: number
    height?: number
  }
  onCancel(event: MouseEvent<HTMLButtonElement>): void
  onOK(blob: Blob | null): void
}

interface CropperFC extends FC<CropperProps> {
  SIZE: {
    SKU: { width: number; height: number }
    LOGO: { width: number; height: number }
  }
  render(options: CropperProps): Promise<Blob | null>
  hide(): void
}

declare const Cropper: CropperFC
export default Cropper
