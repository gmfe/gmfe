import React, { FC, useEffect, useRef } from 'react'
import { Button, Flex, UploaderFile, Modal } from '@gmfe/react'
import CropperJS from 'cropperjs'
import { getLocale } from '@gmfe/locales'

const DEFAULT_OPTIONS: CropperJS.Options = {
  aspectRatio: 1,
  viewMode: 1,
}

export interface CropperProps {
  file?: UploaderFile
  url?: string
  options?: CropperJS.Options
  croppedOptions?: { width?: number; height: number }
  onCancel(): void
  onOK(blob: Blob | null): void
}

interface CropperFC extends FC<CropperProps> {
  SIZE: { SKU: { width: number; height: number }; LOGO: { width: number; height: number } }
  render(props: Omit<CropperProps, 'onCancel' | 'onOK'>): Promise<Blob | null>
  hide: typeof Modal.hide
}

const Cropper: CropperFC = ({ file, url, options, croppedOptions, onCancel, onOK }) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const imgPreviewRef = useRef<HTMLDivElement>(null)
  const cropperRef = useRef<CropperJS>()

  useEffect(() => {
    const imgDOM: HTMLImageElement = imageRef.current!
    const imgPreviewDOM: HTMLDivElement = imgPreviewRef.current!
    cropperRef.current = new CropperJS(imgDOM, {
      ...DEFAULT_OPTIONS,
      ...options,
      preview: imgPreviewDOM,
    })
  }, [options])

  const handleOK = (): void => {
    cropperRef.current!.getCroppedCanvas(croppedOptions).toBlob(
      (blob) => {
        onOK(blob)
      },
      url ? getType(url) ?? 'image/jpeg' : file?.type
    )
  }

  return (
    <div className='gm-cropper'>
      <Flex justifyBetween>
        <div>
          <img alt='' className='gm-cropper-img' ref={imageRef} src={url ?? file?.preview} />
        </div>
        <div>
          <div ref={imgPreviewRef} className='gm-cropper-preview' />
          <div className='gm-text-desc text-center gm-margin-top-10'>{getLocale('预览')}</div>
        </div>
      </Flex>
      <div className='text-right gm-margin-top-10'>
        <Button onClick={onCancel}>{getLocale('取消')}</Button>
        <div className='gm-gap-10' />
        <Button type='primary' onClick={handleOK}>
          {getLocale('确定')}
        </Button>
      </div>
    </div>
  )
}

Cropper.SIZE = {
  SKU: { width: 720, height: 720 },
  LOGO: { width: 720, height: 720 },
}

Cropper.render = (props) => {
  return new Promise<Blob | null>((resolve, reject) => {
    const handleOk = (blob: Blob | null) => {
      Modal.hide()
      resolve(blob)
    }

    const handleCancel = () => {
      Modal.hide()
      reject(new Error('cancel'))
    }

    Modal.render({
      title: getLocale('编辑头像'),
      children: <Cropper {...props} onCancel={handleCancel} onOK={handleOk} />,
      disableMaskClose: true,
      style: {
        width: '520px',
      },
    })
  })
}

Cropper.hide = Modal.hide

export default Cropper
