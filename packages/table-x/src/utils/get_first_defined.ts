import { __DEFAULT_COLUMN } from './constant'

function getFirstDefined(a?: number | string, b?: number | string) {
  if (
    a === __DEFAULT_COLUMN.width &&
    (b === __DEFAULT_COLUMN.minWidth || b === __DEFAULT_COLUMN.maxWidth)
  ) {
    return undefined
  } else if (a !== __DEFAULT_COLUMN.width) {
    return a
  } else {
    return b
  }
}

export default getFirstDefined
