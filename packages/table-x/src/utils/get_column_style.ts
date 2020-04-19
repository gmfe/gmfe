import { TableXColumnInstance } from '../types'
import getFirstDefined from './get_first_defined'
import asPx from './as_px'

// width 200  =>👉  flex: 200 0 auto; width: 200px; max-width: 200px;
// maxWidth 300  =>👉  max-width: 300px;
// minWidth 200  =>👉  flex: 200 0 auto; width: 200px;
// minWidth 50 width 100  =>👉  flex: 100 0 auto; width: 100px; max-width: 100px;
function getColumnStyle({ width, minWidth, maxWidth }: TableXColumnInstance<any>) {
  const _width = getFirstDefined(width, minWidth)
  const _maxWidth = getFirstDefined(width, maxWidth)
  return {
    flex: `${_width} 0 auto`,
    width: asPx(_width),
    maxWidth: asPx(_maxWidth),
  }
}

export default getColumnStyle
