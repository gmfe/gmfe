function getType(url: string): string | undefined {
  if (url.includes('.png')) {
    return 'image/png'
  } else if (url.includes('.jpg') || url.includes('.jpeg')) {
    return 'image/jpeg'
  } else if (url.includes('png')) {
    return 'image/png'
  }
  return undefined
}

export default getType
