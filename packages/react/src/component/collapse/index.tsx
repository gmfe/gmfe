import React, { CSSProperties, Component } from 'react'
import classNames from 'classnames'

export interface CollapseProps {
  in: boolean
  className?: string
  style?: CSSProperties
}

class Collapse extends Component<CollapseProps> {
  render() {
    const { children, className, in: isIn, style, ...rest } = this.props
    return (
      <div
        {...rest}
        className={classNames('gm-collapse', className)}
        style={Object.assign(
          {
            transition: isIn ? '0.5s ease all' : 'inherit',
            height: isIn ? 'inherit' : '0',
            opacity: isIn ? 1 : 0,
            overflow: isIn ? 'inherit' : 'hidden',
          },
          style
        )}
      >
        {children}
      </div>
    )
  }
}

export default Collapse
