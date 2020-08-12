import React, { CSSProperties, FC } from 'react'
import { Flex } from '@gmfe/react'

const Mask: FC<{ style?: CSSProperties }> = ({ style, children }) => {
  return (
    <Flex
      column
      alignCenter
      justifyCenter
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: '46px',
        ...style,
      }}
    >
      {children}
    </Flex>
  )
}

export default Mask
