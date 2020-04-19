import _ from 'lodash'

function checkValue(value: string, precision: number): boolean {
  // 正则说明：前置无限【1-9】的数字加小数点加精度个数字，前置为「0」加小数点加精度个数字
  const reg = new RegExp(
    '(^[1-9]\\d*(\\.\\d{0,' +
      precision +
      '})?$)|(^0(\\.\\d{0,' +
      precision +
      '})?$)'
  )
  if (value.startsWith('-')) {
    value = value.slice(1)
  }
  if (value === '') {
    return true
  }
  return reg.test(value)
}

function text2Number(value: string): number | null {
  if (value === '') {
    return null
  }
  return _.isNaN(parseFloat(value)) ? null : parseFloat(value)
}

function fixNumber(
  value: number | null,
  min?: number,
  max?: number
): number | null {
  if (value !== null) {
    if (max !== undefined && value > max) {
      value = max
    } else if (min !== undefined && value < min) {
      value = min
    }
  }

  return value
}

function processPropsValue(value: number | null): string {
  if (value === null) {
    return ''
  }
  return `${value}`
}

export { checkValue, text2Number, fixNumber, processPropsValue }
