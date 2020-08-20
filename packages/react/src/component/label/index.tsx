import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

type LabelType = 'default' | 'primary' | 'success' | 'danger'

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
  /** 标签样式种类 */
  type?: LabelType
}

const Label: FC<LabelProps> = ({ type, className, children, ...rest }) => {
  return (
    <div {...rest} className={classNames('gm-label', className, `gm-label-${type}`)}>
      {children}
    </div>
  )
}

// Label.defaultProps = {
//   type: 'default',
// }

export default Label
