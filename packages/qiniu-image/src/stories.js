import React from 'react'
import { uploadImage, watermark, mixedWatermark } from './'

export const ReadMe = () => {
  return (
    <div>
      <div>文档 https://github.com/qiniu/js-sdk</div>
    </div>
  )
}

const getToken = () =>
  Request('/gm_wheat/qiniu_token')
    .get()
    .then(json => {
      if (!json.code) {
        return json.data
      } else {
        throw new Error(`error ${json.msg}`)
      }
    })

export const UploadImage = () => {
  return (
    <div>
      <input
        type='file'
        onChange={e => {
          e.preventDefault()

          console.log(e.target.files)
          const file = e.target.files[0]
          uploadImage(file, { getToken }).then(({ url }) => {
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

export const MixedWatermark = () => {
  return (
    <img
      src={mixedWatermark(bigImg, [
        {
          image:
            'https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png',
          gravity: true,
          North: true,
          dy: -10,
          dx: 0
        },
        {
          image:
            'https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png',
          gravity: true,
          SouthWest: true,
          dy: 80,
          dx: 30
        }
      ])}
      style={{ width: '300px', height: '300px', objectFit: 'container' }}
    />
  )
}

export default {
  title: 'qiniu|QiNiuImage'
}
