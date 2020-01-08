import React from 'react'
import { uploadImage, watermark } from './'

export const ReadMe = () => {
  return (
    <div>
      <div>文档 https://github.com/qiniu/js-sdk</div>
    </div>
  )
}

export const UploadImage = () => {
  return (
    <div>
      <input
        type='file'
        onChange={e => {
          e.preventDefault()

          console.log(e.target.files)
          const file = e.target.files[0]
          uploadImage(file).then(url => {
            console.log(url)
          })
        }}
      />
    </div>
  )
}

const bigImg =
  'https://image.document.guanmai.cn/product_image/1578454724850-6462138553958423.jpeg'
const bigImg2 =
  'https://image.document.guanmai.cn/1578302982156-26247327969339773.jpeg'

export const Watermark = () => {
  return (
    <img
      src={watermark(bigImg, {
        mode: 1,
        image:
          'https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png'
      })}
      style={{ width: '300px', height: '300px', objectFit: 'container' }}
    />
  )
}

export default {
  title: 'qiniu|QiNiuImage'
}
