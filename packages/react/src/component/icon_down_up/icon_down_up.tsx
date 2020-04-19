import React, { CSSProperties, FC } from 'react'
import SVGDown from '../../../svg/down.svg'
import classNames from 'classnames'

export interface IconDownUpProps {
  active?: boolean
  className?: string
  style?: CSSProperties
}

const IconDownUp: FC<IconDownUpProps> = ({ active, className, ...rest }) => {
  return <SVGDown {...rest} className={classNames('gm-icon-down-up', { active }, className)} />
}

export default IconDownUp
