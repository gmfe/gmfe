function getKey(cellKey: string) {
  const index = cellKey.indexOf('_')
  const rowKey = parseInt(cellKey.slice(0, index), 10)
  const columnKey = cellKey.slice(index + 1)
  return { rowKey, columnKey }
}

export default getKey
