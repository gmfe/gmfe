import React, { FC, HTMLAttributes, useMemo, useRef } from 'react'
import { Popover, PopupContentConfirm } from '@gmfe/react'
import { getLocale } from '@gmfe/locales'
import classNames from 'classnames'
import OperationIconTip from './icon_tip'
import SVGDelete from '../../../svg/delete.svg'

interface OperationDeleteProps extends HTMLAttributes<HTMLDivElement> {
  onClick(): void
}

const OperationDelete: FC<OperationDeleteProps> = ({
  title,
  onClick,
  className,
  children,
  ...rest
}) => {
  const popoverRef = useRef<Popover>(null)

  const handleDelete = (): void => {
    handleCancel()
    return onClick()
  }

  const handleCancel = (): void => {
    popoverRef.current!.apiDoSetActive()
  }

  const popup = useMemo(
    () => (
      <PopupContentConfirm
        type='delete'
        title={title}
        onCancel={handleCancel}
        onDelete={handleDelete}
      >
        {children ?? getLocale('确定删除？')}
      </PopupContentConfirm>
    ),
    []
  )

  return (
    <Popover popup={popup} ref={popoverRef} right showArrow>
      <div
        {...rest}
        className={classNames(
          'gm-inline-block gm-cursor gm-padding-5 gm-text-14 gm-text gm-text-hover-primary',
          className
        )}
      >
        <OperationIconTip tip={getLocale('删除')}>
          <div>
            <SVGDelete />
          </div>
        </OperationIconTip>
      </div>
    </Popover>
  )
}

export default OperationDelete
