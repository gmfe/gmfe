import React, { FC, HTMLAttributes, MouseEvent } from 'react'
import classNames from 'classnames'
import { getLocale } from '@gmfe/locales'
import OperationIconTip from './icon_tip'
import SVGCheckDetail from '../../../svg/check-detail.svg'

interface OperationDetailProps extends HTMLAttributes<HTMLDivElement> {
  href?: string
  open?: boolean
}

const OperationDetail: FC<OperationDetailProps> = ({ href, open, onClick, className, ...rest }) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    onClick && onClick(event)
    if (href) {
      if (open) {
        window.open(href)
      } else {
        window.location.href = href
      }
    }
  }

  return (
    <div
      {...rest}
      onClick={handleClick}
      className={classNames(
        'gm-inline-block gm-cursor gm-padding-5 gm-text-14 gm-text gm-text-hover-primary',
        className
      )}
    >
      <OperationIconTip tip={getLocale('详情')}>
        <div>
          <SVGCheckDetail />
        </div>
      </OperationIconTip>
    </div>
  )
}

export default OperationDetail
