import React, { CSSProperties, FC } from 'react'
import classNames from 'classnames'
import { RowProps } from './types'
import rowContext from './context'
import { Flex } from '../flex'

const { Provider } = rowContext

const Row: FC<RowProps> = ({ className, gutter = 0, style, children, ...rest }) => {
  let rowStyle: CSSProperties | undefined
  if (gutter > 0 && typeof gutter === 'number') {
    rowStyle = { marginLeft: gutter / -2, marginRight: gutter / -2 }
  } else {
    rowStyle = style
  }

  return (
    <Provider value={{ gutter }}>
      <Flex row wrap {...rest} className={classNames('gm-grid-row', className)} style={rowStyle}>
        {children}
      </Flex>
    </Provider>
  )
}

export default Row
