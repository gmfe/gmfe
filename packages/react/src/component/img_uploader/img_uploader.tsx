import React, { CSSProperties, FC, ReactNode, MouseEvent, useCallback } from 'react'
import classNames from 'classnames'
import { Uploader, UploaderFile } from '../uploader'
import { Flex } from '../flex'
import SvgCloseCircle from '../../../svg/close-circle.svg'

const { DefaultImage } = Uploader

export interface ImgUploaderProps {
  /* 已上传图片 URL 集合 */
  data: string[]
  /* 图片修改回调 */
  onChange(urls: string[]): void
  /* 上传按钮回调函数 */
  onUpload(data: UploaderFile[]): Promise<string[]>
  disabled?: boolean
  accept?: string
  /* 注意，这是添加按钮选择单图还是多图 */
  multiple?: boolean
  /* 图片的尺寸 */
  contentSize?: {
    width: string
    height: string
  }
  desc?: string
  /* 自定义图片展示 */
  imgRender?(url: string): ReactNode
  className?: string
  style?: CSSProperties
}

const ImgUploader: FC<ImgUploaderProps> = ({
  data,
  onChange,
  onUpload,
  disabled,
  accept,
  multiple,
  contentSize,
  desc,
  className,
  children,
  imgRender,
  ...rest
}) => {
  const handleUploader = useCallback(
    (files: UploaderFile[]): void => {
      const result = onUpload(files)
      if (result && result.then) {
        result.then((urls) => {
          onChange(data.concat(urls))
        })
      }
    },
    [onUpload, onChange, data]
  )

  const handleReplace = useCallback(
    (files: UploaderFile[], index: number): void => {
      const result = onUpload(files)
      if (result && result.then) {
        result.then((urls) => {
          const newData = [...data]
          newData[index] = urls[0]

          onChange(newData)
        })
      }
    },
    [onUpload, onChange, data]
  )

  const handleRemove = useCallback(
    (index: number): void => {
      const newData = data.filter((_, i) => i !== index)
      onChange(newData)
    },
    [data, onChange]
  )

  return (
    <div {...rest} className={classNames('gm-img-uploader', className)}>
      <Flex wrap>
        {data.map((item, index) => (
          <Uploader
            onUpload={(files) => handleReplace(files, index)}
            key={index}
            accept={accept}
            disabled={disabled}
            className='gm-img-uploader-item'
          >
            <DefaultImage style={{ width: contentSize!.width, height: contentSize!.height }}>
              {imgRender ? (
                imgRender(item)
              ) : (
                <img
                  src={item}
                  alt=''
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              )}
            </DefaultImage>
            {!disabled && (
              <SvgCloseCircle
                className='gm-img-uploader-close'
                onClick={(event: MouseEvent) => {
                  event.stopPropagation()
                  handleRemove(index)
                }}
              />
            )}
          </Uploader>
        ))}
        {children ?? (
          <Uploader
            disabled={disabled}
            accept={accept}
            onUpload={handleUploader}
            multiple={multiple}
          >
            <DefaultImage
              style={{
                width: contentSize!.width,
                height: contentSize!.height,
              }}
            />
          </Uploader>
        )}
      </Flex>
      {desc && <div className='gm-text-desc gm-margin-5'>{desc}</div>}
    </div>
  )
}

ImgUploader.defaultProps = {
  contentSize: {
    width: '64px',
    height: '64px',
  },
  accept: 'image/*',
}
export default ImgUploader
