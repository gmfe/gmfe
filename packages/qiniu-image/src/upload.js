import { getUploadImageName, getToken, request, getTokenDefault } from './util'
/**
 *
 * @param {*} blob Blob
 * @param {*} options optionsDefault
 */
async function uploadImage(blob, opts = {}) {
  const options = {
    prefix: opts.prefix || '',
    uploadUrl: 'https://upload-z2.qiniup.com/',
    domain: 'https://image.document.guanmai.cn',
    getToken: opts.getToken || getTokenDefault,
    timeout: opts.timeout || 24 * 3600 * 1000 // 24 个小时
  }
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
