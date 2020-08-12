import React, { AnchorHTMLAttributes, FC } from 'react'

const A: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...rest }) => {
  return <a href={`#${href}`} {...rest} />
}

export default A
