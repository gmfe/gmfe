import { getUploadImageName, getToken, request, config } from './util'

async function uploadImage(blob) {
  if (!blob.type.startsWith('image/')) {
    throw new Error('need image')
  }

  const token = await getToken()

  const name = getUploadImageName(blob)
  const path = `product_image/${name}`

  await request(config.uploadUrl, {
    file: blob,
    token,
    key: path
  })

  const url = `${config.domain}/${path}`

  return url
}

export default uploadImage
