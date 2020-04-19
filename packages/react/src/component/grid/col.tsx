import React, { CSSProperties, FC, useContext } from 'react'
import classNames from 'classnames'
import { ColProps } from './types'
import rowContext from './context'

const SIZE_LIST = ['sm', 'md', 'lg', 'xl']

const Col: FC<ColProps> = ({ className, children, span, offset, style, ...rest }) => {
  const { gutter } = useContext(rowContext)
  let sizeClasses: { [key: string]: boolean } = {}
  SIZE_LIST.forEach((size) => {
    let sizeProps: ColProps = {}
    if (typeof (rest as any)[size] === 'number') {
      sizeProps.span = (rest as any)[size]
    } else if (typeof (rest as any)[size] === 'object') {
      sizeProps = (rest as any)[size] ?? {}
    }

    delete (rest as any)[size]

    sizeClasses = {
      ...sizeClasses,
      [`gm-grid-col-${size}-${sizeProps.span}`]: !!sizeProps.span,
      [`gm-grid-col-${size}-offset-${sizeProps.offset}`]: !!sizeProps.offset,
    }
  })

  const classes = classNames(
    'gm-grid-col',
    {
      [`gm-grid-col-${span}`]: span,
      [`gm-grid-col-offset-${offset}`]: offset,
    },
    className,
    sizeClasses
  )

  let colStyle: CSSProperties | undefined
  if (gutter! > 0 && typeof gutter === 'number') {
    colStyle = { paddingLeft: gutter / 2, paddingRight: gutter / 2, ...style }
  } else {
    colStyle = style
  }

  return (
    <div style={colStyle} {...rest} className={classes}>
      {children}
    </div>
  )
}

Col.displayName = 'Col'

export default Col
