function asPx(value: any) {
  value = Number(value)
  return Number.isNaN(value) ? undefined : `${value}px`
}

export default asPx
