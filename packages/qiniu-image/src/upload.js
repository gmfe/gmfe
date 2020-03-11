import { getUploadImageName, getToken, request, optionsDefault } from './util'
/**
 *
 * @param {*} blob Blob
 * @param {*} options optionsDefault
 */
async function uploadImage(blob, opts = {}) {
  const options = { ...optionsDefault, ...opts }
  if (!blob.type.startsWith('image/')) {
    throw new Error('need image')
  }

  const token = await getToken(options)

  const name = getUploadImageName(blob)
  const path = options.prefix ? `${options.prefix}/${name}` : name

  await request(options.uploadUrl, {
    file: blob,
    token,
    key: path
  })

  const url = `${options.domain}/${path}`

  return { url, key: path }
}

export default uploadImage
