import React, { FC, ReactNode, useRef } from 'react'
import { Popover } from '@gmfe/react'
import { getLocale } from '@gmfe/locales'
import { OperationIconTip } from '../operation'
import SVGEditPen from '../../../svg/edit-pen.svg'

interface EditButtonProps {
  popupRender: (closePopup: () => void) => ReactNode
  right?: boolean
}

const EditButton: FC<EditButtonProps> = ({ popupRender, right }) => {
  const popoverRef = useRef<Popover>(null)
  const closePopup = () => popoverRef.current!.apiDoSetActive()

  return (
    <Popover
      ref={popoverRef}
      right={right}
      popup={popupRender(closePopup)}
      offset={right ? 24 : -24}
      showArrow
      arrowLeft={right ? 'calc(100% - 42px)' : 26}
    >
      <span className='gm-table-x-edit-button'>
        <OperationIconTip tip={getLocale('编辑')}>
          <span>
            <SVGEditPen />
          </span>
        </OperationIconTip>
      </span>
    </Popover>
  )
}

export default EditButton
